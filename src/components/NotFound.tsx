import * as React from 'react';
import { Flex, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import Link from './Link';
import Loading from './Loading';

const NotFound = ({ draftsHrefs }: { draftsHrefs: string[] }) => {
  const { asPath, push } = useRouter();

  /**
   * Add /drafts at the beginning to compare with `draftsHrefs`.
   */
  const draftHref = asPath.startsWith('/drafts') ? asPath : `/drafts${asPath}`;

  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    const draftHrefWithoutHashtag = draftHref.split('#')[0];

    if (draftsHrefs.includes(draftHrefWithoutHashtag)) {
      push(draftHref).finally(() => setIsChecking(false));
    } else {
      setIsChecking(false);
    }
  }, [draftHref, draftsHrefs, push]);

  if (isChecking) {
    return <Loading />;
  }

  return (
    <Flex sx={{ margin: 3, flexDirection: 'column' }}>
      <Flex
        sx={{
          justifyContent: 'center',
          marginBottom: 4,
          flexDirection: 'column',
        }}
      >
        <Text sx={{ fontSize: 6, fontWeight: 'bold', textAlign: 'center' }}>
          404
        </Text>
        <Text sx={{ fontSize: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Ops, page not found 😢
        </Text>
      </Flex>
      <Text sx={{ textAlign: 'center', marginY: 4 }}>
        That page does&apos;t exist. But, you can check{' '}
        <Link href="/all">all posts</Link> instead.
      </Text>
    </Flex>
  );
};

export default NotFound;
