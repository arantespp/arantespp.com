import { pascalCase } from 'change-case';
import dynamic from 'next/dynamic';
import { Box } from 'theme-ui';

import { Recommendation, Group } from '../../lib/files';

import HTMLHeaders from './HTMLHeaders';

const Markdown = dynamic(() => import('./Markdown'));
const Recommendations = dynamic(() => import('./Recommendations'));

const IndexPage = ({
  content,
  group,
  recommendations,
  excerpt,
  image,
}: {
  content: string;
  group?: Group;
  recommendations: Recommendation[];
  image?: { url: string };
  excerpt?: string;
}) => {
  const keywords = [
    group || '',
    ...recommendations.flatMap(({ tags }) => tags),
  ];
  return (
    <>
      <HTMLHeaders
        title={group ? pascalCase(group) : undefined}
        description={excerpt}
        image={image}
        keywords={keywords}
      />
      {content && (
        <Box sx={{ marginBottom: 6 }}>
          <Markdown content={content} noH1={false} />
        </Box>
      )}
      <Recommendations recommendations={recommendations} />
    </>
  );
};

export default IndexPage;
