import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import type { Post } from '../lib/files';

import HTMLHeaders from '../components/HTMLHeaders';
import PostEditor from '../components/PostEditor';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const usePostData = () => {
  const { query } = useRouter();
  const { group, slug } = query;
  const key = group && slug ? `/api/post?group=${group}&slug=${slug}` : null;
  const { data } = useSWR<Post>(key, fetcher);
  return { post: data };
};

const Editor = () => {
  const { push } = useRouter();
  const { post } = usePostData();

  return (
    <>
      <Head>
        <HTMLHeaders noIndex />
      </Head>
      <PostEditor
        post={post}
        onSave={({ href }) => {
          push(href);
        }}
      />
    </>
  );
};

export default Editor;
