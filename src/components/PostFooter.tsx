import { Flex, Image } from 'theme-ui';

export const PostFooter = () => {
  return (
    <Flex sx={{ justifyContent: 'center', marginTop: 5, marginBottom: 6 }}>
      <Image
        role="button"
        onClick={() => window.scroll({ top: 0, left: 0 })}
        sx={{ height: '1.5em', marginLeft: 1, cursor: 'pointer' }}
        src="/rose.png"
      />
    </Flex>
  );
};
