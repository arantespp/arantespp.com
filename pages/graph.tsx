import * as React from 'react';
import GraphVis from 'react-graph-vis';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Box, useThemeUI } from 'theme-ui';
import 'vis-network/styles/vis-network.css';

import { theme } from '../theme';

import { getAllTags, getPosts } from '../lib/files';

import RecommendationCard from '../components/RecommendationCard';
import Tag from '../components/Tag';

export const getStaticProps = async () => {
  const allPosts = getPosts({ all: true });
  const allTags = getAllTags();

  const postsNodes = allPosts.map(({ href, title }) => ({
    id: href,
    group: 'post',
    label: title,
    value: 2,
    color: theme.colors?.primary,
  }));

  const tagsNodes = allTags.map((tag) => ({
    id: tag,
    group: 'tag',
    label: tag,
    value: 1,
    color: theme.colors?.highlight,
  }));

  const backlinksEdges = allPosts.flatMap(({ backlinks, href }) =>
    (backlinks || []).map((backlink) => ({
      from: backlink.href,
      to: href,
      value: 2,
    }))
  );

  const tagsEdges = allPosts.flatMap(({ href, tags }) =>
    tags.map((tag) => ({
      from: href,
      to: tag,
      value: 1,
    }))
  );

  const nodes = [...postsNodes, ...tagsNodes];

  const edges = [...backlinksEdges, ...tagsEdges];

  return {
    props: { allPosts, nodes, edges },
  };
};

const Graph = ({
  allPosts,
  nodes,
  edges,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    theme: { fontSizes, sizes },
  } = useThemeUI();

  const [selectedNode, setSelectedNode] = React.useState<{
    id: string;
    group: string;
  }>();

  const graph = { nodes, edges };

  const options = {
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
        max: 5,
      },
      smooth: true,
    },
    layout: {
      randomSeed: '0.07021729341431993:1616325872128',
    },
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
      const node = nodes.find((node) => node.id === event.nodes[0]);
      setSelectedNode(node);
    },
    deselectNode: () => {
      setSelectedNode(undefined);
    },
  };

  return (
    <>
      <Head>
        <title>Graph</title>
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:url"
          key="og:url"
          content={`https://arantespp.com/graph`}
        />
        <meta property="og:title" key="og:title" content="Graph" />
        <meta
          property="og:description"
          key="og:description"
          content="All posts and tags and their connections."
        />
        <meta property="og:image" key="og:image" content="/images/graph.png" />
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
        <GraphVis graph={graph} options={options} events={events} />
      </Box>
    </>
  );
};

export default Graph;
