import * as React from 'react';
import { Flex, Input, Themed } from 'theme-ui';
import { Recommendation } from '../../lib/files';
import { useQuery } from 'react-query';
import Link from '../components/Link';
import Loading from '../components/Loading';
import RecommendationsList from '../components/RecommendationsList';

const SearchPosts = ({ query }: { query: string }) => {
  const { data, isFetching } = useQuery<{ posts: Recommendation[] }>(
    ['/api/search', query],
    ({ queryKey }) =>
      fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ query: queryKey[1] }),
      }).then((r) => r.json()),
    {
      enabled: !!query,
      keepPreviousData: true,
      suspense: false,
    },
  );

  const posts = data?.posts || [];

  return (
    <>
      <Flex
        sx={{
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isFetching && <Loading delay={500} />}
      </Flex>
      <RecommendationsList recommendations={posts} />
    </>
  );
};

const MemoizedSearchPosts = React.memo(SearchPosts);

const All = () => {
  const [query, setQuery] = React.useState('');

  const deferredQuery = React.useDeferredValue(query);

  return (
    <>
      <Themed.h1>Search</Themed.h1>
      <Themed.p>
        What do you want to read?{' '}
        <Link href="/all">See all posts instead.</Link>
      </Themed.p>
      <Input autoFocus onChange={(e) => setQuery(e.target.value)} />
      <MemoizedSearchPosts query={deferredQuery} />
    </>
  );
};

export default All;
