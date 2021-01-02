import { Recommendation } from '../lib/files';

import Markdown from '../components/Markdown';
import Recommendations from '../components/Recommendations';

const IndexPage = ({
  content,
  recommendations,
}: {
  content?: string;
  recommendations: Recommendation[];
}) => {
  return (
    <>
      {content && <Markdown content={content} noH1={false} />}
      <Recommendations recommendations={recommendations} />
    </>
  );
};

export default IndexPage;
