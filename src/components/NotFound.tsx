import { Flex, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import Link from './Link';

const NotFound = () => {
  const { asPath } = useRouter();

  const draftHref = asPath.startsWith('/drafts') ? asPath : `/drafts${asPath}`;

  const showDraftMessage = !asPath.startsWith('/drafts');

  return (
    <Flex sx={{ margin: 3, flexDirection: 'column' }}>
      <Flex
        sx={{
          justifyContent: 'center',
          marginBottom: 4,
          flexDirection: 'column',
        }}
      >
        <Text sx={{ fontSize: 5, fontWeight: 'bold', textAlign: 'center' }}>
          404
        </Text>
        <Text sx={{ fontSize: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Ops, page not found 😢
        </Text>
      </Flex>
      {showDraftMessage && (
        <Text sx={{ textAlign: 'center' }}>
          That page does&apos;t exist. But, maybe it is unfinished post and it
          is still a <Link href={draftHref}>draft.</Link> If you prefer, you can
          check <Link href="/all">all posts</Link> instead.
        </Text>
      )}
    </Flex>
  );
};

export default NotFound;
