import { Box } from 'theme-ui';
import { Markdown } from './Markdown';
import { NextSeo } from 'next-seo';
import { Recommendation } from '../../lib/files';
import { pascalCase } from 'change-case';
import Recommendations from './Recommendations';

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
