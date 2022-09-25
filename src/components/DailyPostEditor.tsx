import * as yup from 'yup';
import { Button, Flex, Input } from 'theme-ui';
import { Control, Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Editor from './Editor';
import Heading from './Heading';

const validationSchema = yup.object({
  linkedInText: yup.string().required('Required'),
  blogPostUrl: yup.string().required('Required').url(),
  tweets: yup
    .array()
    .of(
      yup.object({
        text: yup.string().required('Required'),
      }),
    )
    .required('Required'),
});

export type DailyPostFormValues = yup.InferType<typeof validationSchema>;

const LinkedInEditor = ({
  control,
}: {
  control: Control<DailyPostFormValues>;
}) => {
  return (
    <Flex sx={{ flexDirection: 'column', flex: 1 }}>
      <Heading as="h2">LinkedIn</Heading>
      <Controller
        control={control}
        name="linkedInText"
        render={({ field, fieldState }) => (
          <Editor
            {...field}
            isInvalid={!!fieldState.error}
            sx={{ height: '100%' }}
          />
        )}
      />
    </Flex>
  );
};

const TwitterEditor = ({
  control,
}: {
  control: Control<DailyPostFormValues>;
}) => {
  const { fields, insert, remove } = useFieldArray({
    control,
    name: 'tweets',
  });

  return (
    <Flex sx={{ flexDirection: 'column', flex: 1 }}>
      <Heading as="h2">Twitter</Heading>
      {fields.map((field, index) => (
        <Flex
          key={field.id}
          sx={{ flexDirection: 'column', gap: 1, marginBottom: 4 }}
        >
          <Controller
            control={control}
            name={`tweets.${index}.text`}
            render={({ field, fieldState }) => (
              <Editor {...field} isInvalid={!!fieldState.error} />
            )}
          />
          <Flex sx={{ justifyContent: 'space-between', gap: 3 }}>
            <Button
              sx={{ flex: 1 }}
              onClick={() => {
                insert(index + 1, { text: '' });
              }}
            >
              Append
            </Button>
            <Button
              sx={{ flex: 1 }}
              onClick={() => {
                remove(index);
              }}
            >
              Remove
            </Button>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export const DailyPostEditor = ({
  onSubmit,
}: {
  onSubmit: (data: DailyPostFormValues) => Promise<any>;
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<DailyPostFormValues>({
    defaultValues: {
      tweets: [{ text: '' }],
    },
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ gap: 0, flexDirection: 'column' }}
    >
      <Input {...register('blogPostUrl')} placeholder="blog url" />
      <Flex
        sx={{
          width: '100%',
          flexDirection: ['column', 'row'],
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 4,
        }}
      >
        <LinkedInEditor control={control} />
        <TwitterEditor control={control} />
      </Flex>
      <Button
        type="submit"
        disabled={isSubmitting || isSubmitSuccessful}
        sx={{ marginTop: 5 }}
      >
        Post
      </Button>
    </Flex>
  );
};
