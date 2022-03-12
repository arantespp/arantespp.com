import { useInfiniteQuery, useQueryClient } from 'react-query';
import { Button, Flex, Themed } from 'theme-ui';

import { useApiKey } from '../../hooks/useApiKey';

import Loading from '../../components/Loading';
import {
  ScheduledTweetCard,
  ScheduledTweetProps,
} from '../../components/ScheduledTweetCard';

const queryKey = 'tweets-scheduler-all';

const TweetsSchedulerAll = () => {
  const { apiKey } = useApiKey();

  const queryClient = useQueryClient();

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<{
    tweets: ScheduledTweetProps[];
    nextCursor?: string;
  }>(
    queryKey,
    ({ pageParam }) =>
      fetch(`/api/tweets?cursor=${pageParam ? pageParam : ''}`, {
        headers: {
          'x-api-key': apiKey,
        },
      })
        .then((res) => res.json())
        .then(({ tweets, nextCursor }) => {
          return {
            tweets: tweets.filter(({ completedAt }) => !completedAt),
            nextCursor,
          };
        }),
    {
      enabled: !!apiKey,
      refetchIntervalInBackground: false,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const tweets = data?.pages.flatMap((page) => page.tweets) || [];

  const onUpdated = (data: any) => {
    const allTweets = queryClient.getQueryData<any[]>(queryKey) || [];

    const allTweetsUpdated = allTweets.map((tweet) => {
      return tweet.id === data.id ? data : tweet;
    });

    queryClient.setQueryData(queryKey, allTweetsUpdated);
  };

  return (
    <>
      <Themed.h1>All Scheduled Tweets ({tweets.length})</Themed.h1>
      <Flex sx={{ flexDirection: 'column' }}>
        {tweets.map((tweet) => (
          <ScheduledTweetCard
            key={tweet.id}
            tweet={tweet}
            onUpdated={onUpdated}
          />
        ))}
        {isFetching && <Loading />}
        <Button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load More
        </Button>
      </Flex>
    </>
  );
};

export default TweetsSchedulerAll;
