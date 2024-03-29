import * as React from 'react';
import { NextSeo } from 'next-seo';
import { Post } from '../../lib/files';
import { postTitleToSlug } from '../../lib/postTitleToSlug';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
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
      return fetch(url).then(async (r) => {
        try {
          return await r.json();
        } catch {
          return undefined;
        }
      });
    },
    {
      enabled: Boolean(group && slug),
      suspense: false,
    },
  );

  const onCheckIfPostExists = React.useCallback(
    (args: { group: string; title: string }) => {
      setGroupAndSlug({ group: args.group, slug: postTitleToSlug(args.title) });
    },
    [],
  );

  return (
    <>
      <NextSeo nofollow noindex title="Editor" />
      <PostEditor post={post} onCheckIfPostExists={onCheckIfPostExists} />
    </>
  );
};

export default Editor;
