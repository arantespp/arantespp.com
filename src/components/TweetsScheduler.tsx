import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as dateFns from 'date-fns';
import * as React from 'react';
import { Box, Button, Flex, Input, Label, Text, Textarea } from 'theme-ui';
import * as xslx from 'xlsx';

import { openTwitterScheduler } from '../../shortcuts';
import { useApiKey } from '../hooks/useApiKey';

import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';

const MAX_TWEET_CHARS = 280;

const tweetCharCount = ({ tweet }: { tweet: string }) => {
  /**
   * https://help.twitter.com/en/using-twitter/how-to-tweet-a-link
   * "A URL of any length will be altered to 23 characters"
   */
  const tmpUrl = 'x'.repeat(23);
  const tweetUrlReplace = tweet.replace(/(http[s]?:\/\/[\S]*)/g, tmpUrl);
  return tweetUrlReplace.length;
};

const canScheduleTweets = ({ tweets }: { tweets: string[] }) => {
  return !tweets.some((tweet) => {
    const charactersCount = tweetCharCount({ tweet });
    return charactersCount > MAX_TWEET_CHARS || charactersCount === 0;
  });
};

export type PostTweetResponse =
  | {
      tweet: string;
      scheduledAt: string;
    }
  | { error: string };

const usePostTweet = () => {
  const { apiKey } = useApiKey();

  const postTweet = React.useCallback(
    async ({ tweet }: { tweet: string }): Promise<PostTweetResponse> =>
      fetch('/api/tweet', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ tweet }),
      }).then((res) => res.json()),
    [apiKey],
  );

  return { postTweet };
};

const useTweetsScheduler = ({ tweets }: { tweets: string[] }) => {
  const { postTweet } = usePostTweet();

  const [isScheduling, setIsScheduling] = React.useState(false);

  const [responses, setResponses] = React.useState<PostTweetResponse[]>();

  const [error, setError] = React.useState<Error>();

  const [canSchedule, setCanSchedule] = React.useState(true);

  React.useEffect(() => {
    setCanSchedule(canScheduleTweets({ tweets }));
  }, [tweets]);

  const scheduleTweets = React.useCallback(async () => {
    if (!canSchedule) {
      return;
    }

    try {
      setError(undefined);
      setResponses(undefined);
      setIsScheduling(true);
      const r = await Promise.all(
        tweets.map((tweet) =>
          postTweet({ tweet }).catch((err) => ({ error: err })),
        ),
      );
      setResponses(r);
    } catch (err) {
      setError(err);
    } finally {
      setIsScheduling(false);
    }
  }, [canSchedule, postTweet, tweets]);

  return { scheduleTweets, isScheduling, responses, error, canSchedule };
};

export const TweetEditor = ({
  tweet,
  setTweet,
}: {
  tweet: string;
  setTweet: (t: string) => void;
}) => {
  const charactersCount = tweetCharCount({ tweet });

  const canSchedule = canScheduleTweets({ tweets: [tweet] });

  return (
    <Box>
      <Textarea
        rows={11}
        onChange={(e) => {
          setTweet(e.target.value);
        }}
        value={tweet}
        sx={{ resize: 'none', borderColor: canSchedule ? 'auto' : 'error' }}
      />
      <Text sx={{ textAlign: 'right', color: canSchedule ? 'text' : 'error' }}>
        {charactersCount}/{MAX_TWEET_CHARS}
      </Text>
    </Box>
  );
};

const PostTweetResponse = ({ response }: { response: PostTweetResponse }) => {
  if ('error' in response) {
    return <Text sx={{ colo: 'error' }}>{response.error}</Text>;
  }

  return (
    <Flex sx={{ marginY: 4, flexDirection: 'column' }}>
      <Text sx={{ fontWeight: 'bold' }}>
        {dateFns.format(new Date(response.scheduledAt), 'PP (EEEE) pp')}
      </Text>
      <Text sx={{ fontStyle: 'italic', whiteSpace: 'pre-line' }}>
        {response.tweet}
      </Text>
    </Flex>
  );
};

const ScheduleButton = ({
  disabled,
  onClick,
  children,
}: {
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Flex sx={{ width: '100%', justifyContent: 'center' }}>
      <Button
        sx={{ backgroundColor: 'twitter' }}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </Flex>
  );
};

const useReadXlsx = ({
  setTweets,
}: {
  setTweets: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const inputXlsxRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = React.useCallback((): void => {
    if (inputXlsxRef.current) {
      const { files } = inputXlsxRef.current;

      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target) {
          return;
        }

        const data = e.target.result;
        const workbook = xslx.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const highlights = xslx.utils.sheet_to_json<string[]>(sheet, {
          header: 1,
        });

        const tweets = highlights.map((highlight) => {
          return highlight[0]
            .replaceAll('â\x80\x99', "'")
            .replaceAll('â\x80\x94', ' - ')
            .replaceAll('â\x80\x9C', '"')
            .replaceAll('â\x80\x9D', '"');
        });

        setTweets(tweets);

        if (inputXlsxRef.current) {
          inputXlsxRef.current.value = '';
        }
      };

      if (files) {
        reader.readAsArrayBuffer(files[0]);
      }
    }
  }, [setTweets]);

  React.useEffect(() => {
    const inputXlsx = inputXlsxRef.current;

    if (inputXlsxRef.current) {
      inputXlsx?.addEventListener('change', handleFiles, false);
    }

    return () => {
      inputXlsx?.removeEventListener('change', handleFiles, false);
    };
  }, [handleFiles, inputXlsxRef]);

  return { inputXlsxRef };
};

export const TweetsScheduler = () => {
  const [suffix, setSuffix] = React.useState('');

  const [tweets, setTweets] = React.useState<string[]>([]);

  const { inputXlsxRef } = useReadXlsx({ setTweets });

  const addSuffix = () => {
    const newTweets = tweets.map((tweet) => `${tweet}\n\n${suffix}`);
    setTweets(newTweets);
    setSuffix('');
  };

  const { scheduleTweets, error, isScheduling, canSchedule, responses } =
    useTweetsScheduler({
      tweets,
    });

  const disabled = !!error || isScheduling || !canSchedule;

  if (responses) {
    return (
      <>
        {responses.map((response, index) => {
          const key = `${index}`;
          return <PostTweetResponse key={key} response={response} />;
        })}
      </>
    );
  }

  return (
    <>
      <Flex sx={{ flexDirection: 'column', marginY: 4 }}>
        <Label>Read from xlsx</Label>
        <Input type="file" ref={inputXlsxRef} />
        <Label>Suffix</Label>
        <Input value={suffix} onChange={(e) => setSuffix(e.target.value)} />
        <Button disabled={!suffix} onClick={() => addSuffix()}>
          Add Suffix
        </Button>
      </Flex>

      {tweets.map((tweet, index) => {
        /**
         * `key` cannot be `tweet` otherwise the component will re-render
         * every time the `tweet` changes.
         */
        const key = index.toString();

        const setTweet = (newTweet: string) => {
          setTweets((currentTweets) => {
            const newTweets = [...currentTweets];
            newTweets[index] = newTweet;
            return newTweets;
          });
        };

        return <TweetEditor key={key} {...{ tweet, setTweet }} />;
      })}
      <ScheduleButton disabled={disabled} onClick={scheduleTweets}>
        Schedule Tweets
      </ScheduleButton>
    </>
  );
};

export const TweetScheduler = () => {
  const { postTweet } = usePostTweet();

  const [displaySchedule, setDisplaySchedule] = React.useState(false);

  useKeypressSequenceListener(openTwitterScheduler, () =>
    setDisplaySchedule((d) => !d),
  );

  const [tweet, setTweet] = React.useState('');

  const [isScheduling, setIsScheduling] = React.useState(false);

  const [response, setResponse] = React.useState<PostTweetResponse>();

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
      const r = await postTweet({ tweet });
      setTweet('');
      setResponse(r);
    } catch (error) {
      console.error(error);
    } finally {
      setIsScheduling(false);
    }
  };

  const disableButton = !canScheduleTweets({ tweets: [tweet] }) || isScheduling;

  return (
    <>
      {displaySchedule && (
        <Flex
          sx={{
            top: [0, 'auto'],
            bottom: ['auto', 60],
            right: [0, 60],
            height: ['100%', 'auto'],
            position: 'fixed',
            backgroundColor: 'white',
            width: '100%',
            maxWidth: 500,
            flexDirection: 'column',
            padding: 3,
            borderWidth: 1,
            borderColor: 'muted',
            borderStyle: 'solid',
            borderRadius: 1,
          }}
        >
          <TweetEditor tweet={tweet} setTweet={setTweet} />
          {response && <PostTweetResponse response={response} />}
          <ScheduleButton
            disabled={disableButton}
            onClick={() => scheduleTweet()}
          >
            Schedule
          </ScheduleButton>
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
          borderColor: 'twitter',
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: 'twitter',
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
