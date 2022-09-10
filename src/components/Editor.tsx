import * as React from 'react';
import { Box, Container, Text, Textarea, TextareaProps } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';

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

type EditorProps = TextareaProps & { isValid?: boolean };

const Editor = React.forwardRef<HTMLTextAreaElement, EditorProps>(
  ({ isValid, ...props }, ref) => {
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

        if (isFullScreen) {
          if (textHeight > textAreaHeight) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textHeight + 5000}px`;
          }
        }

        if (!isFullScreen) {
          textAreaRef.current.style.height = 'auto';

          textAreaRef.current.style.height = `${
            textAreaRef.current.scrollHeight + 50
          }px`;
          /**
           * https://stackoverflow.com/a/18262927/8786986
           */
          const scrollLeft =
            window.pageXOffset || textAreaRef.current.scrollLeft;
          const scrollTop = window.pageYOffset || textAreaRef.current.scrollTop;

          window.scrollTo(scrollLeft, scrollTop);
        }
      }
    }, [textAreaRef, value, isFullScreen]);

    /**
     * React controlled input cursor jumps
     * https://stackoverflow.com/a/68928267/8786986
     */
    const [cursor, setCursor] = React.useState<number>();

    React.useEffect(() => {
      if (textAreaRef?.current && cursor) {
        textAreaRef.current.setSelectionRange(cursor, cursor);
      }
    }, [cursor, textAreaRef]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCursor(e.target.selectionStart);
      onChange?.(e);
    };

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
            onChange={handleChange}
            sx={{
              '&:disabled': {
                color: 'muted',
                borderColor: 'muted',
                cursor: 'not-allowed',
              },
              minHeight: '250px',
              overflowY: 'hidden',
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
