import { Box } from 'theme-ui';
import { Markdown } from './Markdown';
import { NextSeo, NextSeoProps } from 'next-seo';
import { Recommendation } from '../../lib/files';
import Recommendations from './Recommendations';

const IndexPage = ({
  content,
  recommendations,
  seo,
}: {
  content: string;
  recommendations: Recommendation[];
  seo: NextSeoProps;
}) => {
  return (
    <>
      <NextSeo {...seo} />
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
