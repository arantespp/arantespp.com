import { Box } from 'theme-ui';
import { Markdown } from './Markdown';
import Heading from './Heading';
import Loading from './Loading';

const Journal = ({ markdown, title }: { markdown?: string; title: string }) => {
  return (
    <>
      <Heading level={1}>{title}</Heading>
      {markdown ? (
        <Box sx={{ marginY: 5 }}>
          <Markdown noH1 content={markdown} />
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Journal;
