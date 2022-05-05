import * as React from 'react';
import * as dateFns from 'date-fns';
import * as yup from 'yup';
import {
  Button,
  Checkbox,
  Flex,
  Input,
  Label,
  Select,
  Text,
  Textarea,
  Themed,
} from 'theme-ui';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { GROUPS } from '../../lib/groups';
import { Post } from '../../lib/files';
import { yupResolver } from '@hookform/resolvers/yup';
import Editor from './Editor';
import Link from './Link';

const schema = yup.object({
  group: yup
    .string()
    .oneOf([...GROUPS])
    .required(),
  title: yup.string().required(),
  /**
   * https://moz.com/learn/seo/meta-description
   */
  excerpt: yup.string().min(50).max(160),
  date: yup.string(),
  tags: yup.string(),
  content: yup.string().required(),
  draft: yup.boolean(),
  bitLink: yup.string(),
  book: yup
    .object({
      authors: yup.array().of(yup.string().required()),
      link: yup.string(),
      ASIN: yup.string(),
    })
    .notRequired()
    .nullable()
    .default(null),
});

export type PostForm = yup.Asserts<typeof schema>;

const putPost = async (post: PostForm) => {
  return fetch(`/api/post`, {
    method: 'PUT',
    body: JSON.stringify(post),
  });
};

const useLastAutoSaveTime = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const updateLastAutoSaveTime = React.useCallback(() => {
    setCurrentTime(new Date());
  }, []);

  const lastAutoSaveTime = dateFns.format(currentTime, 'HH:mm:ss');

  return { updateLastAutoSaveTime, lastAutoSaveTime };
};

const PostEditor = ({
  post,
  onCheckIfPostExists,
}: {
  post?: Post;
  onCheckIfPostExists?: (args: { group: string; title: string }) => void;
}) => {
  const defaultValues = React.useMemo(
    (): Partial<PostForm> => ({
      group: 'zettel',
      content: '',
      tags: '',
      excerpt: '',
      draft: true,
    }),
    [],
  );

  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<PostForm>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const title = watch('title');

  const group = watch('group');

  React.useEffect(() => {
    if (group && title) {
      onCheckIfPostExists?.({ group, title });
    }
  }, [group, onCheckIfPostExists, title]);

  /**
   * Update post because the first props are not yet available
   */
  React.useEffect(() => {
    if (post && !post.draft) {
      post.draft = false;
    }

    reset(
      post
        ? { ...post, tags: post?.tags?.join('; ') }
        : { ...defaultValues, title: watch('title') },
      {
        keepDefaultValues: false,
        keepDirty: false,
      },
    );
  }, [defaultValues, post, reset, watch]);

  const [error, setError] = React.useState('');

  /**
   * Used to display href and post title in the bottom of the form.
   */
  const [currentPost, setCurrentPost] = React.useState<Post | undefined>(post);

  const { updateLastAutoSaveTime, lastAutoSaveTime } = useLastAutoSaveTime();

  const onSubmit = React.useCallback(
    async (data: PostForm) => {
      try {
        setError('');

        reset(data, {
          keepDefaultValues: false,
          keepDirty: false,
        });

        const response = await putPost({ ...data });
        const json = await response.json();

        if (response.status === 200) {
          setCurrentPost(json);
          updateLastAutoSaveTime();
          return true;
        }

        throw json;
      } catch (err) {
        setError(err.message);
        return false;
      }
    },
    [reset, updateLastAutoSaveTime],
  );

  /**
   * Auto-save post.
   */
  React.useEffect(() => {
    if (isValid && isDirty) {
      const timeout = setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 1000);

      return () => clearTimeout(timeout);
    }

    /**
     * Only to prevent the warning.
     */
    return () => null;
  }, [handleSubmit, isDirty, isValid, onSubmit]);

  return (
    <Flex
      as="form"
      sx={{
        flexDirection: 'column',
        input: { fontSize: 1 },
        textarea: { fontSize: 1 },
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label>Title</Label>
      <Textarea rows={2} {...register('title')} autoFocus />
      <ErrorMessage errors={errors} name="title" />

      <Label>Excerpt</Label>
      <Textarea rows={3} {...register('excerpt')} />
      <ErrorMessage errors={errors} name="excerpt" />

      <Label>Groups</Label>
      <Select
        {...register('group')}
        sx={{ pointerEvents: post?.group ? 'none' : 'auto' }}
      >
        {GROUPS.map((groupOption) => (
          <option key={groupOption} value={groupOption}>
            {groupOption}
          </option>
        ))}
      </Select>
      <ErrorMessage errors={errors} name="group" />

      <Label>Tags</Label>
      <Textarea rows={3} {...register('tags')} />
      <ErrorMessage errors={errors} name="tags" />

      <Label>
        <Checkbox {...register('draft')} />
        Draft?
      </Label>

      <Label>Content</Label>
      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange } }) => (
          <Editor {...{ value, onChange, isValid: !errors.content }} />
        )}
      />
      <ErrorMessage errors={errors} name="content" />

      {error && <Themed.p>{error}</Themed.p>}

      {currentPost?.href && (
        <Link href={currentPost.href} target="_blank" rel="noopener noreferrer">
          <Text sx={{ fontStyle: 'italic' }}>
            See post: {currentPost.title} (updated at {lastAutoSaveTime})
          </Text>
        </Link>
      )}

      <Flex sx={{ justifyContent: 'center', marginTop: 4 }}>
        <Button type="submit">Save</Button>
      </Flex>
    </Flex>
  );
};

export default PostEditor;
