import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as dateFns from 'date-fns';
import * as React from 'react';
import { Button, Flex, Text, Textarea } from 'theme-ui';

import { openTwitterScheduler } from '../../shortcuts';

import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';

const twitterColor = '#1da1f2';

const postTweet = async (tweet: string) =>
  fetch('/api/tweet', {
    method: 'POST',
    body: JSON.stringify({ tweet }),
  }).then((res) => res.json());

const TweetScheduler = () => {
  const [displaySchedule, setDisplaySchedule] = React.useState(false);

  useKeypressSequenceListener(openTwitterScheduler, () =>
    setDisplaySchedule((d) => !d),
  );

  const [tweet, setTweet] = React.useState('');

  const [isScheduling, setIsScheduling] = React.useState(false);

  const [response, setResponse] = React.useState<{
    scheduledAt: string;
    text: string;
  }>();

  /**
   * Reset response when scheduler closes.
   */
  React.useEffect(() => {
    if (!displaySchedule) {
      setResponse(undefined);
    }
  }, [displaySchedule]);

  const scheduleTweet = async () => {
    try {
      setIsScheduling(true);
      setResponse(undefined);
      const r = await postTweet(tweet);
      setTweet('');
      setResponse(r);
    } catch (error) {
      console.error(error);
    } finally {
      setIsScheduling(false);
    }
  };

  const charactersCount = tweet.length;

  const disableButton =
    charactersCount === 0 || charactersCount > 280 || isScheduling;

  return (
    <>
      {displaySchedule && (
        <Flex
          sx={{
            bottom: 60,
            right: 60,
            height: '200',
            position: 'fixed',
            backgroundColor: 'white',
            width: '100%',
            maxWidth: 600,
            flexDirection: 'column',
            padding: 3,
            borderWidth: 1,
            borderColor: 'muted',
            borderStyle: 'solid',
            borderRadius: 1,
          }}
        >
          <Textarea
            rows={10}
            onChange={(e) => setTweet(e.target.value)}
            value={tweet}
            sx={{ resize: 'none' }}
          />
          <Text sx={{ textAlign: 'right' }}>{charactersCount}/280</Text>
          {response && (
            <Flex sx={{ margin: 3, flexDirection: 'column' }}>
              <Text sx={{ fontStyle: 'italic' }}>{response.text}</Text>
              <Text sx={{ fontWeight: 'bold' }}>
                {dateFns.format(new Date(response.scheduledAt), 'PPpp')}
              </Text>
            </Flex>
          )}
          <Button
            sx={{ backgroundColor: twitterColor }}
            disabled={disableButton}
            onClick={() => scheduleTweet()}
          >
            Schedule
          </Button>
        </Flex>
      )}
      <Flex
        sx={{
          position: 'fixed',
          bottom: 15,
          right: 15,
          borderRadius: '100%',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: twitterColor,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: twitterColor,
        }}
        onClick={() => setDisplaySchedule(!displaySchedule)}
      >
        <Text
          sx={{
            color: 'white',
            fontSize: 5,
            display: 'inline-flex',
          }}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Text>
      </Flex>
    </>
  );
};

export default TweetScheduler;
