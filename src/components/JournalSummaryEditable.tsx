import * as React from 'react';
import { Box, Flex } from 'theme-ui';
import { useJournalSummary } from './JournalSummary';
import Editor from './Editor';
import FullWidth from './FullWidth';
import Journal from './Journal';

export const JournalSummaryEditable = ({ date }: { date: string }) => {
  const { summary } = useJournalSummary({ date });

  const [editable, setEditable] = React.useState('');

  React.useEffect(() => {
    setEditable(summary);
  }, [summary]);

  return (
    <FullWidth>
      <Flex sx={{ gap: 4, maxHeight: 2000 }}>
        <Box sx={{ flex: 1, overflowY: 'scroll' }}>
          <Editor
            value={editable}
            onChange={(e) => {
              setEditable(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ flex: 1, overflowY: 'scroll', maxWidth: 1000, paddingX: 3 }}>
          <Journal markdown={editable} title={'Summary'} />
        </Box>
      </Flex>
    </FullWidth>
  );
};
