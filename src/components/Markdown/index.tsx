import * as React from 'react';
import { Box } from 'theme-ui';
import { MarkdownProps } from './Markdown';
import dynamic from 'next/dynamic';

const DynamicMarkdown = dynamic(() => import('./Markdown'), {
  suspense: true,
});

const SimplyContent = ({ content }: { content: string }) => {
  return (
    <Box
      sx={{
        whiteSpace: 'pre-line',
      }}
    >
      {content}
    </Box>
  );
};

export const Markdown = (props: MarkdownProps) => {
  return (
    <Box as="article">
      <React.Suspense fallback={<SimplyContent {...props} />}>
        <DynamicMarkdown {...props} />
      </React.Suspense>
    </Box>
  );
};
