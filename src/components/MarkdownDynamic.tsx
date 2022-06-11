import { MarkdownProps } from './Markdown';
import { Text } from 'theme-ui';
import React from 'react';
import dynamic from 'next/dynamic';

const Markdown = dynamic(() => import('./Markdown'), {
  suspense: true,
});

const SimplyContent = ({ content }: { content: string }) => {
  return (
    <Text
      sx={{
        whiteSpace: 'pre-line',
      }}
    >
      {content.trim()}
    </Text>
  );
};

const MarkdownDynamic = (props: MarkdownProps) => {
  return (
    <React.Suspense fallback={<SimplyContent content={props.content} />}>
      <Markdown {...props} />
    </React.Suspense>
  );
};

export default MarkdownDynamic;
