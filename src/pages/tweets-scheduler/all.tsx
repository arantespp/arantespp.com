import { useQuery } from 'react-query';
import { Flex, Themed } from 'theme-ui';

import { useApiKey } from '../../hooks/useApiKey';

import Loading from '../../components/Loading';
import {
  ScheduledTweetCard,
  ScheduledTweetCardProps,
} from '../../components/ScheduledTweetCard';

const TweetsSchedulerAll = () => {
  const { apiKey } = useApiKey();

  const { data = [], status } = useQuery<ScheduledTweetCardProps[]>(
    'tweets-scheduler-all',
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

  return (
    <>
      <Themed.h1>All Scheduled Tweets</Themed.h1>
      {isLoading && <Loading />}
      <Flex sx={{ flexDirection: 'column' }}>
        {data.map((tweet) => (
          <ScheduledTweetCard key={tweet.id} {...tweet} />
        ))}
      </Flex>
    </>
  );
};

export default TweetsSchedulerAll;
