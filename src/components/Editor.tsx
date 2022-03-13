import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Box, Text, Textarea, TextareaProps } from 'theme-ui';

import FullWidth from './FullWidth';

const MAX_HEIGHT = 800;

const MAX_WIDTH = 1000;

const TextAreaContainer = ({
  children,
  isFullScreen,
}: {
  children: React.ReactNode;
  isFullScreen: boolean;
}) => {
  if (isFullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'background',
          padding: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    );
  }

  return <FullWidth>{children}</FullWidth>;
};

const Editor = ({
  isValid,
  ...props
}: TextareaProps & { isValid?: boolean }) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const { value } = props;

  /**
   * Commented because every post edition the cursor kept in the top.
   */
  // React.useEffect(() => {
  //   if (textAreaRef.current) {
  //     const { scrollHeight, scrollTop, clientHeight } = textAreaRef.current;

  //     const isAlmostOnBottom = clientHeight + scrollTop > 0.95 * scrollHeight;

  //     if (isAlmostOnBottom) {
  //       textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
  //     }
  //   }
  // }, [value]);

  React.useEffect(() => {
    if (textAreaRef?.current) {
      /**
       * https://stackoverflow.com/a/25621277/8786986
       */
      textAreaRef.current.style.height = 'auto';

      if (isFullScreen) {
        textAreaRef.current.style.height = '100%';
        return;
      }

      if (MAX_HEIGHT < textAreaRef.current.scrollHeight) {
        textAreaRef.current.style.height = `${MAX_HEIGHT}px`;
      }
    }
  }, [value, isFullScreen]);

  const hasScrollbar =
    (textAreaRef?.current?.scrollHeight || 0) >
    (textAreaRef.current?.clientHeight || 1);

  return (
    <TextAreaContainer isFullScreen={isFullScreen}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: MAX_WIDTH,
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
          value={value}
          sx={{
            '&:disabled': {
              color: 'muted',
              borderColor: 'muted',
              cursor: 'not-allowed',
            },
            overflowClipMargin: 5,
            ...(isValid
              ? {}
              : { borderColor: 'primary', outlineColor: 'primary' }),
          }}
        />
        <Text
          onClick={() => {
            setIsFullScreen(!isFullScreen);
          }}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            marginTop: 1,
            marginRight: hasScrollbar ? 3 : 1,
            cursor: 'pointer',
            display: 'inline-flex',
          }}
        >
          <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
        </Text>
      </Box>
    </TextAreaContainer>
  );
};

export default Editor;
