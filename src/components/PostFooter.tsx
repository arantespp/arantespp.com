import { Flex, Image } from 'theme-ui';

const NO_FOOTER = true;

export const PostFooter = () => {
  if (NO_FOOTER) {
    return (
      <Flex
        sx={{
          marginTop: 5,
          marginBottom: 5,
        }}
      />
    );
  }

  return (
    <Flex
      sx={{
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 6,
      }}
    >
      <Image
        role="button"
        onClick={() => window.scroll({ top: 0, left: 0 })}
        sx={{ height: '1.5em', marginLeft: 1, cursor: 'pointer' }}
        src="/logo.png"
        alt="Logo"
      />
    </Flex>
  );
};

export default PostFooter;
