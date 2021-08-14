import * as React from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Box, Flex, Spinner, Text, useThemeUI } from 'theme-ui';

import HTMLHeaders from '../components/HTMLHeaders';
import RecommendationCard from '../components/RecommendationCard';
import Tag from '../components/Tag';
import { getAllTags, getPosts } from '../lib/files';

import { theme } from '../theme';

const GraphVis = dynamic<any>(() => import('react-graph-vis'), { ssr: false });

export const getStaticProps = async () => {
  const allPosts = getPosts({ all: true });
  const allTags = getAllTags();

  const nodeColors = {
    post: theme.colors?.prussianBlue,
    tag: theme.colors?.honeydew,
    selectedNode: theme.colors?.imperialRed,
    border: theme.colors?.prussianBlue,
  };

  const postsNodes = allPosts.map(({ href, title }) => ({
    id: href,
    group: 'post',
    label: title,
    value: 2,
    color: nodeColors.post,
  }));

  const tagsNodes = allTags.map((tag) => ({
    id: tag,
    group: 'tag',
    label: tag,
    value: 1,
    color: nodeColors.tag,
  }));

  const nodes = [...postsNodes, ...tagsNodes].map((node) => ({
    ...node,
    /**
     * https://visjs.github.io/vis-network/docs/network/nodes.html
     */
    color: {
      border: nodeColors.border,
      background: node.color,
      highlight: {
        background: nodeColors.selectedNode,
        border: nodeColors.border,
      },
      hover: {
        background: node.color,
        border: nodeColors.selectedNode,
      },
    },
  }));

  const backlinksEdges = allPosts
    .flatMap(({ backlinks, href }) =>
      (backlinks || []).map((backlink) => ({
        from: backlink.href,
        to: href,
        value: 1,
      })),
    )
    /**
     * Remove duplicated edges.
     */
    .filter((edge, _, edges) => {
      const duplicatedEdge = edges.find(
        (e) => e.from === edge.to && e.to === edge.from && edge.from > edge.to,
      );
      return !duplicatedEdge;
    });

  const tagsEdges = allPosts.flatMap(({ href, tags }) =>
    tags.map((tag) => ({
      from: href,
      to: tag,
      value: 1,
    })),
  );

  const edges = [...backlinksEdges, ...tagsEdges];

  const mostConnectedNodeId = Object.entries<number>(
    edges.reduce((acc, edge) => {
      if (!acc[edge.from]) {
        acc[edge.from] = 1;
      } else {
        acc[edge.from] += 1;
      }

      if (!acc[edge.to]) {
        acc[edge.to] = 1;
      } else {
        acc[edge.to] += 1;
      }

      return acc;
    }, {}),
  ).reduce(
    (acc, [nodeId, value]) => {
      if (acc.value < value) {
        return { nodeId, value };
      }
      return acc;
    },
    { nodeId: '', value: 0 },
  ).nodeId;

  const mostConnectedNode = nodes.find(
    (node) => node.id === mostConnectedNodeId,
  );

  if (mostConnectedNode) {
    /**
     * Do something in the future.
     */
  }

  return {
    props: { allPosts, nodes, edges, nodeColors, mostConnectedNodeId },
  };
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <Flex sx={{ justifyContent: 'center', alignItems: 'baseline', marginX: 2 }}>
    <Box
      sx={{
        padding: 2,
        borderRadius: 999,
        backgroundColor: color,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
      }}
    />
    <Text sx={{ marginX: 2, fontStyle: 'italic' }}>{label}</Text>
  </Flex>
);

const Network = ({
  allPosts,
  nodes: propsNodes,
  edges,
  nodeColors,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    theme: { fontSizes, sizes },
  } = useThemeUI();

  const [selectedNode, setSelectedNode] = React.useState<{
    id: string;
    group: string;
  }>();

  const [stabilizationIterationsDone, setStabilizationIterationsDone] =
    React.useState(false);

  const [network, setNetwork] = React.useState<any>();

  const { query } = useRouter();

  const nodes = (() =>
    propsNodes.map((node) => {
      if (
        query.node &&
        typeof query.node === 'string' &&
        query.node === node.id
      ) {
        // Do something with the node id passed by URL.
        Object.assign(node);
      }

      return node;
    }))();

  const selectNode = React.useCallback(
    (id: string) => {
      const node = nodes.find((n) => n.id === id);
      setSelectedNode(node);
    },
    /**
     * Cannot add nodes as dependency because it will recreates this method
     * every time and it'll affect the useEffect that handles the selected
     * node by query params.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  /**
   * Select fixed node.
   */
  React.useEffect(() => {
    if (network && query.node) {
      selectNode(query.node as string);

      try {
        network.selectNodes([query.node]);
      } catch (err) {
        network.selectNodes([]);
      }
    }
  }, [network, query.node, selectNode]);

  /**
   * Set stabilization after some time even if graph isn't stabilized.
   */
  React.useEffect(() => {
    setTimeout(() => {
      setStabilizationIterationsDone(true);
    }, 3 * 1000);
  });

  const options = {
    autoResize: true,
    clickToUse: true,
    edges: {
      arrows: {
        to: {
          enabled: false,
        },
        from: {
          enabled: false,
        },
      },
      scaling: {
        min: 1,
        max: 1,
      },
      smooth: true,
    },
    interaction: {
      hover: true,
    },
    layout: { improvedLayout: false, randomSeed: nodes.length },
    nodes: {
      shape: 'dot',
      scaling: {
        label: {
          min: fontSizes?.[2],
          max: fontSizes?.[3],
        },
      },
    },
    physics: {
      stabilization: {
        iterations: 200,
      },
      solver: 'barnesHut',
    },
  };

  const events = {
    selectNode: (event: any) => {
      selectNode(event.nodes[0]);
    },
    deselectNode: () => {
      setSelectedNode(undefined);
    },
    stabilizationIterationsDone: () => {
      setStabilizationIterationsDone(true);
    },
  };

  return (
    <>
      <HTMLHeaders
        title="Network"
        url="/network"
        description="All posts and tags and their connections."
        image={{ url: 'https://arantespp.com/images/network.png' }}
      />
      <Box
        sx={{
          backgroundColor: 'white',
          width: '98%',
          height: '95vh',
          marginX: 'auto',
          position: 'relative',
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 1,
        }}
      >
        {selectedNode && (
          <Box
            sx={{
              position: 'absolute',
              backgroundColor: 'white',
              zIndex: 2,
              maxWidth: (sizes as any)?.container,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'primary',
              margin: 2,
              padding: 2,
            }}
          >
            {selectedNode.group === 'post' && (
              <RecommendationCard
                recommendation={
                  allPosts.find((post) => post.href === selectedNode.id)!
                }
              />
            )}
            {selectedNode.group === 'tag' && <Tag tag={selectedNode.id} />}
          </Box>
        )}
        {!stabilizationIterationsDone && (
          <Flex
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Spinner />
          </Flex>
        )}
        <GraphVis
          graph={{ nodes, edges }}
          options={options}
          events={events}
          getNetwork={(graphNetwork) => {
            if (!network) {
              setNetwork(graphNetwork);
            }
          }}
        />
      </Box>
      <Flex
        sx={{
          width: '100%',
          justifyContent: 'center',
          marginY: 3,
          flexWrap: 'wrap',
        }}
      >
        <Legend color={nodeColors.post as string} label="Post" />
        <Legend color={nodeColors.tag as string} label="Tag" />
        <Legend
          color={nodeColors.selectedNode as string}
          label="Selected Node"
        />
      </Flex>
    </>
  );
};

export default Network;
