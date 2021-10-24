import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button, Flex, Text, Textarea } from 'theme-ui';

const twitterColor = '#1da1f2';

const postTweet = async (tweet: string) =>
  fetch('/api/tweet', {
    method: 'POST',
    body: JSON.stringify({ tweet }),
  }).then((res) => res.json());

const TweetScheduler = () => {
  const [displaySchedule, setDisplaySchedule] = React.useState(false);

  const [tweet, setTweet] = React.useState('');

  const [isScheduling, setIsScheduling] = React.useState(false);

  const scheduleTweet = async () => {
    try {
      setIsScheduling(true);
      await postTweet(tweet);
      setTweet('');
      setDisplaySchedule(false);
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
          }}
        >
          <Textarea
            rows={10}
            onChange={(e) => setTweet(e.target.value)}
            value={tweet}
            sx={{ resize: 'none' }}
          />
          <Text sx={{ textAlign: 'right' }}>{charactersCount}/280</Text>
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
          bottom: 20,
          right: 20,
          borderRadius: '100%',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: twitterColor,
          width: 60,
          height: 60,
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
