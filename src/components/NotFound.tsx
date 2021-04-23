import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Flex, Link, Text } from 'theme-ui';

const NotFound = () => {
  const { asPath } = useRouter();

  const draftHref = asPath.startsWith('/_draft') ? asPath : `/_drafts${asPath}`;

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
      <Text sx={{ textAlign: 'center' }}>
        That page does&apos;t exist. But, maybe it is unfinished post and it is
        still a{' '}
        <NextLink href={draftHref}>
          <Link
            sx={{
              textDecoration: 'underline',
            }}
          >
            draft.
          </Link>
        </NextLink>
      </Text>
    </Flex>
  );
};

export default NotFound;
