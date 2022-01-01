import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as dateFns from 'date-fns';
import * as React from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { Button, Flex, Input, Label, Text, Textarea } from 'theme-ui';
import * as xslx from 'xlsx';
import * as yup from 'yup';

import { openTwitterScheduler } from '../../shortcuts';
import { useApiKey } from '../hooks/useApiKey';

import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';

export const TWEET_MAX_CHARS = 280;

const tweetCharCount = (tweet: string) => {
  /**
   * https://help.twitter.com/en/using-twitter/how-to-tweet-a-link
   * "A URL of any length will be altered to 23 characters"
   */
  const tmpUrl = 'x'.repeat(23);
  const tweetUrlReplace = tweet.replace(/(http[s]?:\/\/[\S]*)/g, tmpUrl);
  return tweetUrlReplace.length;
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

export const TweetEditor = ({
  value,
  onChange,
  maxChars = TWEET_MAX_CHARS,
}: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  maxChars?: number;
}) => {
  const charactersCount = tweetCharCount(value);

  const reachedMaxChars = charactersCount > maxChars;

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Textarea
        rows={7}
        onChange={onChange}
        value={value}
        sx={{ borderColor: reachedMaxChars ? 'error' : 'auto' }}
        aria-label="tweetEditor"
      />
      <Text
        sx={{ textAlign: 'right', color: reachedMaxChars ? 'error' : 'text' }}
      >
        {charactersCount}/{maxChars}
      </Text>
    </Flex>
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
  onClick?: () => void;
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

const getFinalTweet = ({
  tweet,
  suffix,
}: {
  tweet: string;
  suffix?: string;
}) => {
  if (!suffix) {
    return tweet;
  }

  return `${tweet}\n\n${suffix}`;
};

const getTweetMaxCharsLeft = ({ suffix }: { suffix?: string }) => {
  return TWEET_MAX_CHARS - tweetCharCount(getFinalTweet({ tweet: '', suffix }));
};

const schema = yup
  .object({
    suffix: yup.string(),
    tweets: yup
      .array()
      .of(
        yup.object({
          value: yup
            .string()
            .default('')
            .min(1, 'Tweet must be at least 1 characters')
            .test({
              name: 'reachedMaxChars',
              exclusive: false,
              params: {},
              message: 'Tweet reacher max characters, counting with suffix',
              test(value, context) {
                /**
                 * https://github.com/jquense/yup/issues/398#issuecomment-916693907
                 */
                const [, parent2] = (context as any)?.from;
                const { suffix } = parent2?.value;
                return (
                  tweetCharCount(getFinalTweet({ tweet: value, suffix })) <=
                  TWEET_MAX_CHARS
                );
              },
            })
            .required(),
        }),
      )
      .min(1, 'You must provide at least one tweet')
      .required(),
  })
  .required();

type TweetsSchedulerFormValues = yup.Asserts<typeof schema>;

export const TweetsScheduler = () => {
  const { postTweet } = usePostTweet();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    setValue,
    watch,
  } = useForm<TweetsSchedulerFormValues>({
    defaultValues: {
      tweets: [],
      suffix: '',
    },
    resolver: yupResolver(schema),
  });

  const { fields, prepend, remove, insert } = useFieldArray({
    control,
    name: 'tweets',
  });

  const { inputXlsxRef } = useReadXlsx({
    setTweets: (tweets: string[]) => {
      setValue(
        'tweets',
        tweets.map((tweet) => ({ value: tweet })),
      );
    },
  });

  const [responses, setResponses] = React.useState<PostTweetResponse[]>([]);

  const tweetMaxChars = getTweetMaxCharsLeft({ suffix: watch('suffix') });

  const onSubmit = async (values: TweetsSchedulerFormValues) => {
    try {
      await Promise.all(
        values.tweets.map(async (tweet, index) => {
          const finalTweet = getFinalTweet({
            tweet: tweet.value,
            suffix: values.suffix,
          });

          const response = await postTweet({ tweet: finalTweet });

          if ('error' in response) {
            setError(`tweets.${index}.value`, {
              type: 'manual',
              message: response.error,
            });
          } else {
            setResponses((r) => [...r, response]);
            remove(index);
          }
        }),
      );
    } catch (err) {
      setError('tweets', { type: 'manual', message: err.message });
    }
  };

  const disabled = isSubmitting;

  return (
    <Flex
      as="form"
      sx={{ flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex sx={{ flexDirection: 'column', marginY: 4 }}>
        <Label>Read from xlsx</Label>
        <Input type="file" ref={inputXlsxRef} />
        <Label htmlFor="suffix">Suffix</Label>
        <Input id="suffix" {...register('suffix')} />
      </Flex>

      <Button
        type="button"
        aria-label="prependTweetButton"
        onClick={() => prepend({ value: '' })}
      >
        Add Tweet
      </Button>

      {fields.map((field, index) => {
        const name = `tweets.${index}.value` as const;

        return (
          <Flex key={field.id} sx={{ flexDirection: 'column' }}>
            <Text>Tweet #{index + 1}</Text>
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, value } }) => {
                return (
                  <TweetEditor
                    value={value}
                    onChange={onChange}
                    maxChars={tweetMaxChars}
                  />
                );
              }}
            />
            <ErrorMessage errors={errors} name={name} />
            <Flex>
              <Button
                type="button"
                onClick={() => insert(index + 1, { value: '' })}
              >
                Add
              </Button>
              <Button
                type="button"
                onDoubleClick={() => remove(index)}
                sx={{ backgroundColor: 'accent' }}
              >
                Remove (double click)
              </Button>
            </Flex>
          </Flex>
        );
      })}
      <ErrorMessage errors={errors} name="tweets" />

      {responses.map((response) => {
        /**
         * Error is show on Tweet editor.
         */
        if ('error' in response) {
          return null;
        }

        return <PostTweetResponse key={response.tweet} response={response} />;
      })}

      <Button
        aria-label="submitButton"
        type="submit"
        sx={{ backgroundColor: 'twitter' }}
        disabled={disabled}
      >
        Schedule
      </Button>
    </Flex>
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

  const disableButton = isScheduling;

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
