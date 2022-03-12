import { useQuery, useQueryClient } from 'react-query';
import { Flex, Themed } from 'theme-ui';

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

  const { data = [], status } = useQuery<ScheduledTweetProps[]>(
    queryKey,
    () =>
      fetch('/api/tweets', {
        headers: {
          'x-api-key': apiKey,
        },
      })
        .then((res) => res.json())
        .then((tweet) => tweet.filter(({ completedAt }) => !completedAt)),
    { enabled: !!apiKey, refetchIntervalInBackground: false },
  );

  const isLoading = status === 'loading';

  const onUpdated = (data: any) => {
    const allTweets = queryClient.getQueryData<any[]>(queryKey) || [];

    const allTweetsUpdated = allTweets.map((tweet) => {
      return tweet.id === data.id ? data : tweet;
    });

    queryClient.setQueryData(queryKey, allTweetsUpdated);
  };

  return (
    <>
      <Themed.h1>All Scheduled Tweets</Themed.h1>
      {isLoading && <Loading />}
      <Flex sx={{ flexDirection: 'column' }}>
        {data.map((tweet) => (
          <ScheduledTweetCard
            key={tweet.id}
            tweet={tweet}
            onUpdated={onUpdated}
          />
        ))}
      </Flex>
    </>
  );
};

export default TweetsSchedulerAll;
