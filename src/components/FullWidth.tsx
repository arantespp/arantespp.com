import { Flex } from 'theme-ui';

const FullWidth = ({ children }) => {
  /**
   * 96 to avoid overflow X.
   */
  const editorWidthInVw = 95;

  return (
    <Flex
      sx={{
        width: [`${editorWidthInVw}vw`],
        position: 'relative',
        left: ['50%'],
        right: ['50%'],
        marginX: [`-${editorWidthInVw / 2}vw`],
        justifyContent: 'center',
      }}
    >
      {children}
    </Flex>
  );
};

export default FullWidth;
