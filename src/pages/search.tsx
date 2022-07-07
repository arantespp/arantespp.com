import * as React from 'react';
import { Box, Input, Themed } from 'theme-ui';
import { Recommendation } from '../../lib/files';
import { useQuery } from 'react-query';
import Link from '../components/Link';
import Loading from '../components/Loading';
import RecommendationsList from '../components/RecommendationsList';

const SearchPosts = ({ query }: { query: string }) => {
  const { data, isLoading } = useQuery<{ posts: Recommendation[] }>(
    ['/api/search', query],
    ({ queryKey }) =>
      fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ query: queryKey[1] }),
      }).then((r) => r.json()),
    {
      enabled: !!query,
      suspense: false,
    },
  );

  const posts = data?.posts || [];

  return (
    <>
      {isLoading && <Loading />}
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
      <Box sx={{ marginBottom: 5 }}>
        <Input autoFocus onChange={(e) => setQuery(e.target.value)} />
      </Box>
      <MemoizedSearchPosts query={deferredQuery} />
    </>
  );
};

export default All;
