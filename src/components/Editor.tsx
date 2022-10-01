import * as React from 'react';
import { Box, Container, Text } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import Textarea, { TextAreaProps } from 'rc-textarea';

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
          paddingBottom: 7,
          overflow: 'auto',
        }}
      >
        <Container sx={{ maxWidth: '52em' }}>{children}</Container>
      </Box>
    );
  }

  return <>{children}</>;
};

const useCombinedRefs = (...refs: React.ForwardedRef<any>[]) => {
  const targetRef = React.useRef<any>(null);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

type EditorProps = TextAreaProps & { isInvalid?: boolean };

const Editor = React.forwardRef<any, EditorProps>(
  ({ isInvalid, ...props }, ref) => {
    const innerRef = React.useRef(null);

    const textAreaRef = useCombinedRefs(ref, innerRef);

    const [isFullScreen, setIsFullScreen] = React.useState(false);

    return (
      <TextAreaContainer isFullScreen={isFullScreen}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            '.textarea': {
              width: '100%',
              '&:disabled': {
                color: 'muted',
                borderColor: 'muted',
                cursor: 'not-allowed',
              },
              overflowY: 'hidden',
              ...(isInvalid
                ? { borderColor: 'primary', outlineColor: 'primary' }
                : {}),
            },
          }}
        >
          <Textarea
            ref={textAreaRef}
            placeholder="Write something..."
            onKeyDown={(e) => {
              if (e.key === 'Tab' && !e.shiftKey) {
                document.execCommand('insertText', false, '  ');
                e.preventDefault();
              }
            }}
            className="textarea"
            autoSize={{
              minRows: 5,
            }}
            onResize={(size) => {
              console.log(size);
            }}
            {...props}
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
              marginRight: 1,
              cursor: 'pointer',
              display: 'inline-flex',
            }}
          >
            <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
          </Text>
        </Box>
      </TextAreaContainer>
    );
  },
);

export default React.memo(Editor);
