import * as React from 'react';
import { Textarea, TextareaProps } from 'theme-ui';

import FullWidth from './FullWidth';

const Editor = (props: TextareaProps) => {
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
    <FullWidth>
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
        // eslint-disable-next-line react/destructuring-assignment
        sx={{ maxWidth: 1500, ...props.sx }}
      />
    </FullWidth>
  );
};

export default Editor;
