import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useQuery } from 'react-query';

import type { Post } from '../../lib/files';
import { postTitleToSlug } from '../../lib/postTitleToSlug';

import HTMLHeaders from '../components/HTMLHeaders';
import PostEditor from '../components/PostEditor';

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

  const { data: post } = useQuery<Post>(
    ['editor', { group, slug }],
    async () => {
      const url = `/api/post?group=${group}&slug=${slug}`;
      return fetch(url).then((r) => r.json());
    },
    { enabled: !!(group && slug) },
  );

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
