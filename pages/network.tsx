import * as React from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Flex, Text, useThemeUI } from 'theme-ui';
import 'vis-network/styles/vis-network.css';

import RecommendationCard from '../components/RecommendationCard';
import Tag from '../components/Tag';
import { getAllTags, getPosts } from '../lib/files';
import { theme } from '../theme';

const GraphVis = dynamic<any>(() => import('react-graph-vis'), { ssr: false });

export const getStaticProps = async () => {
  const allPosts = getPosts({ all: true });
  const allTags = getAllTags();

  const nodeColors = {
    post: theme.colors?.primary,
    tag: theme.colors?.highlight,
    mostConnectedNode: theme.colors?.accent,
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

  const backlinksEdges = allPosts
    .flatMap(({ backlinks, href }) =>
      (backlinks || []).map((backlink) => ({
        from: backlink.href,
        to: href,
        value: 1,
      }))
    )
    /**
     * Remove duplicated edges.
     */
    .filter((edge, _, edges) => {
      const duplicatedEdge = edges.find(
        (e) => e.from === edge.to && e.to === edge.from && edge.from > edge.to
      );
      return !duplicatedEdge;
    });

  const tagsEdges = allPosts.flatMap(({ href, tags }) =>
    tags.map((tag) => ({
      from: href,
      to: tag,
      value: 1,
    }))
  );

  const nodes = [...postsNodes, ...tagsNodes];

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
    }, {})
  ).reduce(
    (acc, [nodeId, value]) => {
      if (acc.value < value) {
        return { nodeId, value };
      } else {
        return acc;
      }
    },
    { nodeId: '', value: 0 }
  ).nodeId;

  const mostConnectedNode = nodes.find(
    (node) => node.id === mostConnectedNodeId
  );

  if (mostConnectedNode) {
    (mostConnectedNode as any).color = nodeColors.mostConnectedNode;
  }

  return {
    props: { allPosts, nodes, edges, nodeColors },
  };
};

const Legend = ({
  border,
  color,
  label,
}: {
  border?: boolean;
  color: string;
  label: string;
}) => {
  return (
    <Flex sx={{ justifyContent: 'center', alignItems: 'baseline', marginX: 2 }}>
      <Box
        sx={{
          padding: 2,
          borderRadius: 999,
          backgroundColor: color,
          borderWidth: border ? 1 : 0,
          borderColor: 'black',
          borderStyle: 'solid',
        }}
      />
      <Text sx={{ marginX: 2, fontStyle: 'italic' }}>{label}</Text>
    </Flex>
  );
};

const Network = ({
  allPosts,
  nodes: propsNodes,
  edges,
  nodeColors,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    theme: { fontSizes, sizes },
  } = useThemeUI();

  const [_showGraph, setShowGraph] = React.useState(false);

  const [selectedNode, setSelectedNode] = React.useState<{
    id: string;
    group: string;
  }>();

  const [network, setNetwork] = React.useState<any>();

  const { query } = useRouter();

  const nodes = (() => {
    if (query.node && typeof query.node === 'string') {
      return propsNodes.map((node) => {
        if (node.id === query.node) {
          return {
            ...node,
            fixed: true,
            x: 0,
            y: 0,
          };
        }

        return node;
      });
    }

    return propsNodes;
  })();

  const selectNode = React.useCallback((id: string) => {
    const node = nodes.find((node) => node.id === id);
    setSelectedNode(node);
  }, []);

  React.useEffect(() => {
    if (network) {
      console.log('Network done.');
    }
  }, [network]);

  /**
   * Select fixed node.
   */
  React.useEffect(() => {
    if (network && query.node) {
      selectNode(query.node as string);
      try {
        network.selectNodes([query.node]);
      } catch (err) {}
    }
  }, [network, query.node, selectNode]);

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
    layout: {},
    nodes: {
      shape: 'dot',
      scaling: {
        label: {
          min: fontSizes?.[2],
          max: fontSizes?.[3],
        },
      },
    },
    physics: {},
  };

  const events = {
    selectNode: (event: any) => {
      selectNode(event.nodes[0]);
    },
    deselectNode: () => {
      setSelectedNode(undefined);
    },
    startStabilizing: () => {
      setShowGraph(true);
    },
  };

  return (
    <>
      <Head>
        <title>Network</title>
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:url"
          key="og:url"
          content={`https://arantespp.com/network`}
        />
        <meta property="og:title" key="og:title" content="Network" />
        <meta
          property="og:description"
          key="og:description"
          content="All posts and tags and their connections."
        />
        <meta
          property="og:image"
          key="og:image"
          content="/images/network.png"
        />
      </Head>
      <Box
        sx={{
          backgroundColor: 'white',
          width: '98%',
          height: '95vh',
          marginX: 'auto',
          position: 'relative',
          borderColor: 'primary',
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
        <Legend color={nodeColors.tag as string} label="Tag" border />
        <Legend
          color={nodeColors.mostConnectedNode as string}
          label="Most Connected Node"
        />
      </Flex>
    </>
  );
};

export default Network;
