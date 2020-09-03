/** @jsx jsx */
import { pascalCase } from 'change-case';
import NextLink from 'next/link';
import { jsx } from 'theme-ui';

import type { PostAndPostsRecommendations } from '../lib/files';

type Recommendations = PostAndPostsRecommendations['recommendations'];

const PostsList = ({
  recommendations,
}: {
  recommendations: Recommendations;
}) => {
  return (
    <section sx={{ display: 'flex', flexDirection: 'column' }}>
      <span sx={{ fontSize: 4, fontWeight: 'bold' }}>More posts</span>
      {recommendations.map(({ href, title, excerpt, date, group }) => {
        return (
          <div
            key={title}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 4,
            }}
          >
            <NextLink as={href} href="/[group]/[slug]" passHref>
              <a sx={{ fontSize: 2 }}>{title}</a>
            </NextLink>
            <span sx={{ fontSize: [2], fontStyle: 'italic' }}>
              "{excerpt.replace(/"/g, '')}"
            </span>
            <span sx={{ color: 'gray', fontSize: 1 }}>
              {`${pascalCase(group)} - ${date}`}
            </span>
          </div>
        );
      })}
    </section>
  );
};

export default PostsList;
