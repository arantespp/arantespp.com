import * as React from 'react';
import { Box } from 'theme-ui';
import { MarkdownProps } from './Markdown';
import dynamic from 'next/dynamic';

const DynamicMarkdown = dynamic(() => import('./Markdown'));

const SimplyContent = ({ content }: { content: string }) => {
  return <>{content}</>;
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
