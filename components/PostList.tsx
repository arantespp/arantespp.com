import * as React from 'react';

import { pascalCase } from 'change-case';
import Link from 'next/link';

import type { PostAndPostsRecommendations } from '../lib/files';

type Recommendations = PostAndPostsRecommendations['recommendations'];

const PostsList = ({
  recommendations,
}: {
  recommendations: Recommendations;
}) => {
  return (
    <section className="flex flex-col">
      <span className="text-3xl font-bold">More posts</span>
      {recommendations.map(({ href, title, excerpt, date, group }) => {
        return (
          <div key={title} className="flex flex-col mb-6">
            <Link as={href} href="/[group]/[slug]" passHref>
              <a>{title}</a>
            </Link>
            <span className="text-lg italic">
              "{excerpt.replace(/"/g, '')}"
            </span>
            <span className="text-base text-gray-500">
              {`${pascalCase(group)} - ${date}`}
            </span>
          </div>
        );
      })}
    </section>
  );
};

export default PostsList;
