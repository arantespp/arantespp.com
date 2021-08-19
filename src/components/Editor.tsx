import { Textarea, TextareaProps } from 'theme-ui';

const Editor = (props: TextareaProps) => {
  return (
    <Textarea
      placeholder="Write something..."
      rows={20}
      onKeyDown={(e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
          document.execCommand('insertText', false, '  ');
          e.preventDefault();
        }
      }}
      {...props}
    />
  );
};

export default Editor;
