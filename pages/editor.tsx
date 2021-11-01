import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';

import type { Post } from '../src/lib/files';
import { postTitleToSlug } from '../src/lib/postTitleToSlug';

import HTMLHeaders from '../src/components/HTMLHeaders';
import PostEditor from '../src/components/PostEditor';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Editor = () => {
  const { query, isReady } = useRouter();

  const [{ group, slug }, setGroupAndSlug] = React.useState<{
    group?: string;
    slug?: string;
  }>({
    group: query.group as string | undefined,
    slug: query.slug as string | undefined,
  });

  React.useEffect(() => {
    if (isReady) {
      setGroupAndSlug({
        group: query.group as string | undefined,
        slug: query.slug as string | undefined,
      });
    }
  }, [isReady, query.group, query.slug]);

  const key = group && slug ? `/api/post?group=${group}&slug=${slug}` : null;

  const { data: post } = useSWR<Post>(key, fetcher);

  const onCheckIfPostExists = React.useCallback(
    (args: { group: string; title: string }) => {
      setGroupAndSlug({ group: args.group, slug: postTitleToSlug(args.title) });
    },
    [],
  );

  return (
    <>
      <Head>
        <HTMLHeaders noIndex />
      </Head>
      <PostEditor post={post} onCheckIfPostExists={onCheckIfPostExists} />
    </>
  );
};

export default Editor;
