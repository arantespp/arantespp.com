import { ResponsiveNetwork } from '@nivo/network';
import { InferGetStaticPropsType } from 'next';
import { useThemeUI } from 'theme-ui';

import { getAllTags, getPosts } from '../lib/files';

import RecommendationCard from '../components/RecommendationCard';
import Tag from '../components/Tag';

export const getStaticProps = async () => {
  const allPosts = getPosts({ all: true });
  const allTags = getAllTags();

  const postsNodes = allPosts.map(({ href }) => ({
    id: href,
    type: 'post',
    radius: 12,
    depth: 0,
  }));

  const tagsNodes = allTags.map((tag) => ({
    id: tag,
    type: 'tag',
    radius: 5,
  }));

  const backlinksLinks = allPosts.flatMap(({ backlinks, href }) =>
    (backlinks || []).map((backlink) => ({
      source: backlink.href,
      target: href,
      type: 'post',
    }))
  );

  const tagsLinks = allPosts.flatMap(({ href, tags }) =>
    tags.map((tag) => ({
      source: href,
      target: tag,
      type: 'tag',
    }))
  );

  const nodes = [...postsNodes, ...tagsNodes];

  const links = [...backlinksLinks, ...tagsLinks];

  return {
    props: { allPosts, nodes, links },
  };
};

const Graph = ({
  allPosts,
  nodes,
  links,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    theme: { colors },
  } = useThemeUI();

  return (
    <div style={{ width: '100%', height: '1000px' }}>
      <ResponsiveNetwork
        {...{
          nodes,
          links,
          nodeColor: ({ type }) =>
            (type === 'post' ? colors?.primary : colors?.powderBlue) as any,
          linkColor: colors?.accent,
          linkThickness: ({ type }) => (type === 'post' ? 4 : 1),
          tooltip: ({ id, type }) => {
            if (type === 'tag') {
              return <Tag tag={id} />;
            }

            return (
              <RecommendationCard
                recommendation={allPosts.find(({ href }) => href === id)!}
              />
            );
          },
        }}
      />
    </div>
  );
};

export default Graph;
