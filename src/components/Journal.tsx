import { Box } from 'theme-ui';
import Heading from './Heading';
import Markdown from './Markdown';

const Journal = ({ markdown, title }: { markdown?: string; title: string }) => {
  return (
    <>
      <Heading level={1}>{title}</Heading>
      {markdown && (
        <Box sx={{ marginY: 5 }}>
          <Markdown noH1 content={markdown} />
        </Box>
      )}
    </>
  );
};

export default Journal;
