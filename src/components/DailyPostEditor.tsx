import * as yup from 'yup';
import { Button, Input } from 'theme-ui';
import { Control, Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Editor from './Editor';

const validationSchema = yup.object({
  linkedInText: yup.string().required('Required'),
  blogPostUrl: yup.string().required('Required').url(),
});

export type DailyPostFormValues = yup.InferType<typeof validationSchema>;

const LinkedInEditor = ({
  control,
}: {
  control: Control<DailyPostFormValues>;
}) => {
  return (
    <>
      <Controller
        control={control}
        name="linkedInText"
        render={({ field, fieldState }) => (
          <Editor {...field} isInvalid={!!fieldState.error} />
        )}
      />
    </>
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
    formState: { isSubmitting },
  } = useForm<DailyPostFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('blogPostUrl')} placeholder="blog url" />
      <LinkedInEditor control={control} />
      <Button type="submit" disabled={isSubmitting}>
        Post
      </Button>
    </form>
  );
};
