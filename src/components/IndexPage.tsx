import { Box } from 'theme-ui';
import { NextSeo } from 'next-seo';
import { pascalCase } from 'change-case';
import dynamic from 'next/dynamic';

import { Recommendation } from '../../lib/files';

const Markdown = dynamic(() => import('./Markdown'));
const Recommendations = dynamic(() => import('./Recommendations'));

const IndexPage = ({
  content,
  title,
  recommendations,
  excerpt,
}: {
  content: string;
  title?: string;
  recommendations: Recommendation[];
  excerpt?: string;
}) => {
  return (
    <>
      <NextSeo
        {...{
          title: pascalCase(title || ''),
          description: excerpt,
        }}
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
