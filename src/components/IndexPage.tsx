import { pascalCase } from 'change-case';
import dynamic from 'next/dynamic';
import { Box } from 'theme-ui';

import { Recommendation } from '../../lib/files';

import HTMLHeaders from './HTMLHeaders';

const Markdown = dynamic(() => import('./Markdown'));
const Recommendations = dynamic(() => import('./Recommendations'));

const IndexPage = ({
  content,
  title,
  recommendations,
  excerpt,
  image,
}: {
  content: string;
  title?: string;
  recommendations: Recommendation[];
  image?: { url: string };
  excerpt?: string;
}) => {
  const keywords = [
    title || '',
    ...recommendations.flatMap(({ tags }) => tags),
  ];
  return (
    <>
      <HTMLHeaders
        title={title ? pascalCase(title) : undefined}
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
