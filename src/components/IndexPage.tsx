import { Box } from 'theme-ui';

import { Recommendation } from '../lib/files';

import Markdown from './Markdown';
import Recommendations from './Recommendations';

const IndexPage = ({
  content,
  recommendations,
}: {
  content: string;
  recommendations: Recommendation[];
}) => (
  <>
    {content && (
      <Box sx={{ marginBottom: 5 }}>
        <Markdown content={content} noH1={false} />
      </Box>
    )}
    <Recommendations recommendations={recommendations} />
  </>
);

export default IndexPage;
