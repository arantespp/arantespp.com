import * as React from 'react';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Box, Button, Flex, Text } from 'theme-ui';

// import { nodeColors } from '../components/NetworkGraph';
import FullWidth from '../components/FullWidth';
import HTMLHeaders from '../components/HTMLHeaders';
import RecommendationCard from '../components/RecommendationCard';
import Tag from '../components/Tag';

import { getAllTags, getPosts } from '../../lib/files';

const NetworkGraph = dynamic(() => import('../components/NetworkGraph'), {
  ssr: false,
});

export const getStaticProps = async () => {
  const allPosts = getPosts({ all: true });
  const allTags = getAllTags();

  const postsNodes = allPosts.map(({ href, title }) => ({
    id: href,
    group: 'post',
    name: title,
    val: 20,
  }));

  const tagsNodes = allTags.map((tag) => ({
    id: tag,
    group: 'tag',
    name: `#${tag}`,
    val: 1,
  }));

  const nodes = [...postsNodes, ...tagsNodes].map((node) => ({
    ...node,
  }));

  const backlinksLinks = allPosts
    .flatMap(({ backlinks, href }) =>
      (backlinks || []).map((backlink) => ({
        target: backlink.href,
        source: href,
      })),
    )
    /**
     * Remove duplicated edges.
     */
    .filter((edge, _, edges) => {
      const duplicatedEdge = edges.find(
        (e) =>
          e.target === edge.source &&
          e.source === edge.target &&
          edge.target > edge.source,
      );

      return !duplicatedEdge;
    });

  const tagsLinks = allPosts.flatMap(({ href, tags }) =>
    tags.map((tag) => ({
      target: href,
      source: tag,
      value: 1,
    })),
  );

  const links = [...backlinksLinks, ...tagsLinks].map((link) => ({
    ...link,
  }));

  return {
    props: { allPosts, nodes, links },
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
  nodes,
  links,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [selectedNodeId, setSelectedNodeId] = React.useState('');

  const selectedNode = React.useMemo(() => {
    return nodes.find((n) => n.id === selectedNodeId);
  }, [nodes, selectedNodeId]);

  const router = useRouter();

  React.useEffect(() => {
    if (router.query.node && typeof router.query.node === 'string') {
      setSelectedNodeId(router.query.node);
    }
  }, [router.query.node]);

  return (
    <>
      <HTMLHeaders
        title="Network"
        url="/network"
        description="All posts and tags and their connections."
        image={{ url: 'https://arantespp.com/images/network.png' }}
      />
      <FullWidth>
        <NetworkGraph
          {...{
            selectedNodeId,
            setSelectedNodeId,
            graphData: { nodes, links },
          }}
        />
      </FullWidth>

      {selectedNode && (
        <Box
          sx={{
            marginTop: 4,
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
    </>
  );
};

export default Network;
