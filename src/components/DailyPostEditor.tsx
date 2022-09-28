import * as React from 'react';
import * as yup from 'yup';
import { Button, Flex, Input, Text } from 'theme-ui';
import {
  Controller,
  FormProvider,
  UseFieldArrayInsert,
  UseFieldArrayRemove,
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import Editor from './Editor';
import Heading from './Heading';

const TWEET_LENGTH = 280;

const validationSchema = yup.object({
  blogPostUrl: yup.string().required('Required').url(),
  linkedInText: yup.string().required('Required'),
  tweets: yup
    .array()
    .of(
      yup.object({
        text: yup.string().required('Required').max(TWEET_LENGTH),
      }),
    )
    .required('Required'),
});

export type DailyPostFormValues = yup.InferType<typeof validationSchema>;

const LinkedInEditor = () => {
  return (
    <Flex sx={{ flexDirection: 'column', flex: 1 }}>
      <Heading as="h2">LinkedIn</Heading>
      <Controller
        name="linkedInText"
        render={({ field, fieldState, formState }) => (
          <>
            <Editor {...field} isInvalid={!!fieldState.error} />
            <ErrorMessage errors={formState.errors} name="linkedInText" />
          </>
        )}
      />
    </Flex>
  );
};

const BREAK_THREAD = '\n\n\n';

const SingleTweet = ({
  index,
  insert,
  remove,
}: {
  index: number;
  insert: UseFieldArrayInsert<DailyPostFormValues, 'tweets'>;
  remove: UseFieldArrayRemove;
}) => {
  const { watch, setValue } = useFormContext<DailyPostFormValues>();

  const singleTweetName = `tweets.${index}.text` as const;

  const {
    field,
    fieldState: { error, isDirty },
    formState,
  } = useController({
    name: singleTweetName,
  });

  const linkedInText = watch('linkedInText');

  const numberOfTweets = watch('tweets').length;

  const tweetValue = watch(singleTweetName);

  React.useEffect(() => {
    if (isDirty) {
      return;
    }

    setValue(singleTweetName, linkedInText);
  }, [isDirty, linkedInText, setValue, singleTweetName]);

  React.useEffect(() => {
    /**
     * Only break the thread if it is dirty.
     */
    if (!isDirty) {
      return;
    }

    if (tweetValue?.includes(BREAK_THREAD)) {
      const [first, second] = tweetValue.split(BREAK_THREAD);
      setValue(singleTweetName, first);
      insert(index + 1, { text: second });
    }
  }, [index, insert, isDirty, setValue, singleTweetName, tweetValue]);

  return (
    <Flex sx={{ flexDirection: 'column', gap: 1, marginBottom: 4 }}>
      <Text sx={{ fontWeight: 'bold' }}>Tweet #{index + 1}</Text>
      <Editor {...field} isInvalid={!!error} />
      <Text>
        {field.value.length}/{TWEET_LENGTH}
      </Text>
      <ErrorMessage errors={formState.errors} name={singleTweetName} />
      <Flex
        sx={{
          justifyContent: 'flex-start',
          gap: 3,
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => {
            insert(index + 1, { text: '' });
          }}
        >
          Append
        </Button>
        <Button
          onDoubleClick={() => {
            remove(index);
          }}
          disabled={numberOfTweets === 1}
        >
          Remove
        </Button>
      </Flex>
    </Flex>
  );
};

const TwitterEditor = () => {
  const { fields, insert, remove } = useFieldArray<
    DailyPostFormValues,
    'tweets'
  >({
    name: 'tweets',
  });

  return (
    <Flex sx={{ flexDirection: 'column', flex: 1 }}>
      <Heading as="h2">Twitter</Heading>
      {fields.map((field, index) => (
        <SingleTweet
          key={field.id}
          index={index}
          insert={insert}
          remove={remove}
        />
      ))}
    </Flex>
  );
};

export const DailyPostEditor = ({
  onSubmit,
}: {
  onSubmit: (data: DailyPostFormValues) => Promise<any>;
}) => {
  const formMethods = useForm<DailyPostFormValues>({
    defaultValues: {
      tweets: [{ text: '' }],
    },
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ gap: 0, flexDirection: 'column' }}
      >
        <Input {...register('blogPostUrl')} placeholder="blog url" />
        <ErrorMessage errors={errors} name="blogPostUrl" />
        <Flex
          sx={{
            width: '100%',
            flexDirection: ['column'],
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}
        >
          <LinkedInEditor />
          <TwitterEditor />
        </Flex>
        <Button
          type="submit"
          disabled={isSubmitting || isSubmitSuccessful}
          sx={{ marginTop: 5 }}
        >
          Post
        </Button>
      </Flex>
    </FormProvider>
  );
};
