import * as React from 'react';
import { Box, Textarea, TextareaProps } from 'theme-ui';

const Editor = (props: TextareaProps) => {
  const editorWidthInVw = 80;
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const { value } = props;

  React.useEffect(() => {
    if (textAreaRef?.current) {
      /**
       * https://stackoverflow.com/a/25621277/8786986
       */
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${
        textAreaRef?.current?.scrollHeight + 100
      }px`;
    }
  }, [value]);

  return (
    <Box
      sx={{
        width: [null, null, null, `${editorWidthInVw}vw`],
        position: 'relative',
        left: [null, null, null, '50%'],
        right: [null, null, null, '50%'],
        marginX: [null, null, null, `-${editorWidthInVw / 2}vw`],
      }}
    >
      <Textarea
        ref={textAreaRef}
        placeholder="Write something..."
        rows={10}
        onKeyDown={(e) => {
          if (e.key === 'Tab' && !e.shiftKey) {
            document.execCommand('insertText', false, '  ');
            e.preventDefault();
          }
        }}
        {...props}
      />
    </Box>
  );
};

export default Editor;
