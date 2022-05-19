import * as React from 'react';
import { Button, Flex, Themed } from 'theme-ui';
import {
  ScheduledTweetCard,
  ScheduledTweetProps,
} from '../../components/ScheduledTweetCard';
import { useApiKey } from '../../hooks/useApiKey';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import Loading from '../../components/Loading';

const queryKey = 'tweets-scheduler-all';

const TweetsSchedulerAll = () => {
  const queryClient = useQueryClient();

  const { apiKey } = useApiKey();

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<{
    tweets: ScheduledTweetProps[];
    nextCursor?: string;
  }>(
    [queryKey, apiKey],
    async ({ pageParam, queryKey }) => {
      return fetch(`/api/tweets?cursor=${pageParam ? pageParam : ''}`, {
        headers: {
          'x-api-key': queryKey[1] as string,
        },
      })
        .then((res) => res.json())
        .then(({ tweets, nextCursor }) => {
          return {
            tweets: tweets.filter(({ completedAt }) => !completedAt),
            nextCursor,
          };
        });
    },
    {
      enabled: !!apiKey,
      refetchIntervalInBackground: false,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const tweets = data?.pages?.flatMap((page) => page.tweets) || [];

  const onUpdated = React.useCallback(
    (updatedTweet: any) => {
      const allTweets = queryClient.getQueryData<{
        pageParams: any[];
        pages: { nextCursor: string; tweets: ScheduledTweetProps[] }[];
      }>(queryKey) || { pageParams: [], pages: [] };

      const newPages = allTweets.pages.map((page) => {
        const newPage = {
          ...page,
          tweets: page.tweets.map((tweet) => {
            if (tweet.id === updatedTweet.id) {
              return updatedTweet;
            }

            return tweet;
          }),
        };

        return newPage;
      });

      const updatedAllTweets = { ...allTweets, pages: newPages };

      queryClient.setQueryData(queryKey, updatedAllTweets);
    },
    [queryClient],
  );

  return (
    <>
      <Themed.h1>All Scheduled Tweets ({tweets.length})</Themed.h1>
      <Flex sx={{ flexDirection: 'column', gap: 4 }}>
        <Flex sx={{ flexDirection: 'column', gap: 2 }}>
          {tweets.map((tweet, index) => (
            <ScheduledTweetCard
              cardNumber={index + 1}
              key={tweet.id}
              tweet={tweet}
              onUpdated={onUpdated}
            />
          ))}
        </Flex>
        {isFetching && <Loading />}
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetching}>
            Load More
          </Button>
        )}
      </Flex>
    </>
  );
};

export default TweetsSchedulerAll;
