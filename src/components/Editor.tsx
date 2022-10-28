import * as React from 'react';
import { Box, Container, Flex, Text, Textarea, TextareaProps } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faCompress,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';

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
          overflow: 'auto',
        }}
      >
        <Container
          sx={{
            maxWidth: '52em',
            paddingBottom: 6,
          }}
        >
          {children}
        </Container>
      </Box>
    );
  }

  return <>{children}</>;
};

const useCombinedRefs = (
  ...refs: React.ForwardedRef<HTMLTextAreaElement>[]
) => {
  const targetRef = React.useRef<HTMLTextAreaElement>(null);

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

type EditorProps = TextareaProps & { isInvalid?: boolean };

const Editor = React.forwardRef<HTMLTextAreaElement, EditorProps>(
  ({ isInvalid, ...props }, ref) => {
    const innerRef = React.useRef(null);

    const textAreaRef = useCombinedRefs(ref, innerRef);

    const [isFullScreen, setIsFullScreen] = React.useState(false);

    const { value, onChange } = props;

    React.useEffect(() => {
      if (textAreaRef?.current) {
        const textAreaHeight = Number(
          textAreaRef.current.style.height.replace('px', ''),
        );

        const textHeight = textAreaRef.current.scrollHeight;

        if (textHeight > textAreaHeight) {
          textAreaRef.current.style.height = 'auto';
          textAreaRef.current.style.height = `${textHeight + 50}px`;
        }
      }
    }, [textAreaRef, value, isFullScreen]);

    React.useEffect(() => {
      const textAreaStyle = textAreaRef.current?.style;

      return () => {
        if (textAreaStyle) {
          /**
           * Reset the height when textarea changes.
           */
          textAreaStyle.height = '0px';
        }
      };
    }, [textAreaRef]);

    return (
      <TextAreaContainer isFullScreen={isFullScreen}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
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
            {...props}
            value={value}
            onChange={onChange}
            sx={{
              '&:disabled': {
                color: 'muted',
                borderColor: 'muted',
                cursor: 'not-allowed',
              },
              width: '100%',
              overflowY: 'hidden',
              overflowClipMargin: 5,
              resize: 'vertical',
              ...(isInvalid
                ? { borderColor: 'primary', outlineColor: 'primary' }
                : {}),
            }}
          />
          <Flex
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              marginTop: 2,
              marginRight: 2,
              gap: 3,
              '> *': {
                cursor: 'pointer',
                display: 'inline-flex',
              },
            }}
          >
            <Text onClick={() => {}}>
              <FontAwesomeIcon icon={faArrowDown} />
            </Text>
            <Text
              onClick={() => {
                setIsFullScreen(!isFullScreen);
              }}
            >
              <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
            </Text>
          </Flex>
        </Box>
      </TextAreaContainer>
    );
  },
);

export default React.memo(Editor);
