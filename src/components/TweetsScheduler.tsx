import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import {
  Control,
  Controller,
  useForm,
  useFieldArray,
  useWatch,
} from 'react-hook-form';
import { Button, Checkbox, Flex, Input, Label, Text, Textarea } from 'theme-ui';
import wait from 'waait';
import * as xslx from 'xlsx';
import * as yup from 'yup';

import { useApiKey } from '../hooks/useApiKey';

import { ScheduledTweetCard, ScheduledTweetProps } from './ScheduledTweetCard';
import {
  charReplacer,
  tweetCharCount,
  TweetEditor,
  TWEET_MAX_CHARS,
} from './TweetEditor';

export type PostTweetResponse = ScheduledTweetProps | { error: string };

const usePostTweet = () => {
  const { apiKey } = useApiKey();

  const postTweet = React.useCallback(
    async ({
      tweet,
      numberOfTweets,
    }: {
      tweet: string;
      numberOfTweets: number;
    }): Promise<PostTweetResponse> =>
      fetch('/api/tweet', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ tweet, numberOfTweets }),
      }).then((res) => res.json()),
    [apiKey],
  );

  return { postTweet };
};

const PostTweetResponseCard = ({
  response,
  onUpdated,
}: {
  response: PostTweetResponse;
  onUpdated: (tweet: ScheduledTweetProps) => void;
}) => {
  if ('error' in response) {
    return <Text sx={{ colo: 'error' }}>{response.error}</Text>;
  }

  return <ScheduledTweetCard tweet={response} onUpdated={onUpdated} />;
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

        const tweets = highlights
          .filter((highlight) => {
            if (!Array.isArray(highlight)) {
              return false;
            }

            if (!highlight[0]) {
              return false;
            }

            if (typeof highlight[0] !== 'string') {
              return false;
            }

            return true;
          })
          .map((highlight) => {
            return charReplacer(
              highlight[0]
                .replaceAll('â\x80\x94', '—')
                .replaceAll('â\x80\x99', "'")
                .replaceAll('â\x80\x9C', '"')
                .replaceAll('â\x80\x9D', '"'),
            );
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
          checked: yup.boolean().notRequired().default(false),
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

/**
 * Save form to load tweets to finish the work later.
 */
const useSaveForm = ({
  control,
  reset,
  isDirty,
  singleTweet,
}: {
  control: Control<any>;
  reset: any;
  isDirty: boolean;
  singleTweet?: boolean;
}) => {
  const key = 'arantespp.com/tweets-scheduler';

  React.useEffect(() => {
    if (singleTweet) {
      return;
    }

    const data = localStorage.getItem(key);

    if (data) {
      const parsedData = JSON.parse(data);

      if (parsedData.tweets.length > 0) {
        reset(parsedData);
      }
    }
  }, [reset, singleTweet]);

  const formValues = useWatch({ control });

  React.useEffect(() => {
    if (singleTweet) {
      return;
    }

    if (isDirty) {
      localStorage.setItem(key, JSON.stringify(formValues));
    }
  }, [formValues, isDirty, singleTweet]);

  const clear = React.useCallback(() => {
    localStorage.removeItem(key);
    reset();
  }, [reset]);

  return { clear };
};

export const TweetsScheduler = ({ singleTweet }: { singleTweet?: boolean }) => {
  const { postTweet } = usePostTweet();

  const {
    control,
    formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    watch,
  } = useForm<TweetsSchedulerFormValues>({
    mode: 'onBlur',
    defaultValues: {
      tweets: singleTweet ? [{ value: '', checked: false }] : [],
      suffix: '',
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, prepend, remove, insert } = useFieldArray({
    control,
    name: 'tweets',
  });

  useSaveForm({
    control,
    reset,
    isDirty,
    singleTweet,
  });

  const { inputXlsxRef } = useReadXlsx({
    setTweets: (tweets: string[]) => {
      setValue(
        'tweets',
        tweets.map((tweet) => ({ value: tweet, checked: false })),
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
            await wait(index * 2000);

            try {
              const response = await postTweet({
                tweet: finalTweet,
                numberOfTweets: values.tweets.length,
              });

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

  const onTweetUpdated = (index: number) => (data: ScheduledTweetProps) => {
    setResponses((r) => {
      const newResponses = [...r];
      newResponses[index] = data;
      return newResponses;
    });
  };

  const disabled = isSubmitting;

  const tweets = watch('tweets');

  const numberOfCheckedTweets = tweets.filter((tweet) => tweet.checked).length;

  const numberOfTweets = tweets.length;

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
          <Flex
            key={field.id}
            sx={{ flexDirection: 'column', marginY: singleTweet ? 0 : 4 }}
          >
            <Text>Tweet #{index + 1}</Text>
            <Controller
              control={control}
              name={name}
              render={({ field: { value, onBlur } }) => {
                return (
                  <TweetEditor
                    value={value}
                    onBlur={() => {
                      setValue(`tweets.${index}.checked`, true);
                      onBlur();
                    }}
                    setValue={(v) => setValue(name, v)}
                    maxChars={tweetMaxChars}
                    disabled={disabled}
                  />
                );
              }}
            />
            <ErrorMessage
              errors={errors}
              name={name}
              as={<Text sx={{ color: 'error', fontStyle: 'italic' }} />}
            />
            {!singleTweet && (
              <Flex sx={{ gap: 3, alignItems: 'center' }}>
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
                  Remove #{index + 1} (double click)
                </Button>
                <Controller
                  defaultValue={false}
                  control={control}
                  name={`tweets.${index}.checked`}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Label sx={{ width: 10 }}>
                        <Checkbox
                          onBlur={onBlur}
                          onChange={onChange}
                          checked={value}
                        />
                      </Label>
                    );
                  }}
                />
              </Flex>
            )}
          </Flex>
        );
      })}
      {!singleTweet && <ErrorMessage errors={errors} name="tweets" />}

      {responses.map((response, index) => {
        /**
         * Error is show on Tweet editor.
         */
        if ('error' in response) {
          return null;
        }

        return (
          <PostTweetResponseCard
            key={response.id}
            response={response}
            onUpdated={onTweetUpdated(index)}
          />
        );
      })}

      {!singleTweet && (
        <Flex
          sx={{
            position: 'sticky',
            bottom: 3,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Text
            sx={{ fontSize: 4, backgroundColor: 'white', fontWeight: 'bold' }}
          >
            Checks: {numberOfCheckedTweets}/{numberOfTweets}
          </Text>
        </Flex>
      )}

      {!isSubmitSuccessful && (
        <Button
          aria-label="submitButton"
          type="submit"
          sx={{
            backgroundColor: disabled ? 'muted' : 'twitter',
            cursor: 'pointer',
          }}
          disabled={disabled}
        >
          Schedule
        </Button>
      )}

      {isSubmitSuccessful && (
        <Button
          type="button"
          onClick={() => {
            reset();
            setResponses([]);
          }}
          sx={{
            backgroundColor: disabled ? 'muted' : 'twitter',
            cursor: 'pointer',
          }}
        >
          Schedule Again
        </Button>
      )}
    </Flex>
  );
};
