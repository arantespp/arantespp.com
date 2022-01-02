import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as dateFns from 'date-fns';
import * as React from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { Button, Flex, Input, Label, Text, Textarea } from 'theme-ui';
import wait from 'waait';
import * as xslx from 'xlsx';
import * as yup from 'yup';

import { useApiKey } from '../hooks/useApiKey';

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

const charReplacer = (tweet: string) =>
  tweet.replaceAll('’', "'").replaceAll('“', '"').replaceAll('”', '"');

export const TweetEditor = ({
  value,
  onChange,
  maxChars = TWEET_MAX_CHARS,
  disabled,
}: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  maxChars?: number;
  disabled?: boolean;
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const charactersCount = tweetCharCount(value);

  const reachedMaxChars = charactersCount > maxChars;

  React.useEffect(() => {
    if (textareaRef.current) {
      /**
       * https://stackoverflow.com/a/46012210/8786986
       */
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value',
      )?.set;
      nativeInputValueSetter?.call(textareaRef.current, charReplacer(value));
      const event = new Event('input', { bubbles: true });
      textareaRef.current.dispatchEvent(event);
    }
  }, [value]);

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Textarea
        ref={textareaRef}
        rows={7}
        onChange={onChange}
        value={value}
        sx={{ borderColor: reachedMaxChars ? 'error' : 'auto' }}
        aria-label="tweetEditor"
        disabled={disabled}
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

export const TweetsScheduler = ({ singleTweet }: { singleTweet?: boolean }) => {
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
      tweets: singleTweet ? [{ value: '' }] : [],
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
      const toBeRemoved = (
        await Promise.all(
          values.tweets.map(async (tweet, index) => {
            const finalTweet = getFinalTweet({
              tweet: tweet.value,
              suffix: values.suffix,
            });

            /**
             * Avoid Twitter API rate limit.
             * "Service unavailable due to request timeout; please try the request again later"
             */
            await wait(index * 500);

            try {
              const response = await postTweet({ tweet: finalTweet });

              if ('error' in response) {
                setError(`tweets.${index}.value`, {
                  type: 'manual',
                  message: response.error,
                });
              } else {
                setResponses((r) => [...r, response]);
                return index;
              }
            } catch (error) {
              setError(`tweets.${index}.value`, {
                type: 'manual',
                message: error.message,
              });
            }

            return undefined;
          }),
        )
      ).filter((index): index is number => typeof index === 'number');

      remove(toBeRemoved);
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
      {!singleTweet && (
        <>
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
        </>
      )}

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
                    disabled={disabled}
                  />
                );
              }}
            />
            <ErrorMessage errors={errors} name={name} />
            {!singleTweet && (
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
            )}
          </Flex>
        );
      })}
      {!singleTweet && <ErrorMessage errors={errors} name="tweets" />}

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
