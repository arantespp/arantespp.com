import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex, Input, Label, Select, Textarea, Themed } from 'theme-ui';
import * as yup from 'yup';

import type { Post } from '../lib/files';
import { GROUPS } from '../lib/groups';

import Editor from './Editor';
import Link from './Link';

const schema = yup.object({
  group: yup
    .string()
    .oneOf([...GROUPS])
    .required(),
  title: yup.string().required(),
  excerpt: yup.string(),
  date: yup.string(),
  rating: yup.number().positive().integer().required(),
  tags: yup.string(),
  content: yup.string().required(),
  draft: yup.boolean(),
  bitLinks: yup.array().of(yup.string().required()),
});

export type PostForm = yup.Asserts<typeof schema>;

const putPost = async (post: PostForm) => {
  return fetch(`/api/post`, {
    method: 'PUT',
    body: JSON.stringify(post),
  });
};

const PostEditor = ({ post }: { post?: Post }) => {
  const defaultValues = React.useMemo(
    () => ({ rating: 3, group: '', content: '', tags: '', excerpt: '' }),
    [],
  );

  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<PostForm>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  /**
   * Update post because the first props are not yet available
   */
  React.useEffect(() => {
    reset(post ? { ...post, tags: post.tags.join('; ') } : defaultValues, {
      keepDefaultValues: false,
      keepDirty: false,
    });
  }, [defaultValues, post, reset]);

  const [error, setError] = React.useState('');

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
          return true;
        }

        throw json;
      } catch (err) {
        setError(err.message);
        return false;
      }
    },
    [reset],
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

  const isButtonDisabled = !isDirty || !isValid;

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
        {GROUPS.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </Select>
      <ErrorMessage errors={errors} name="group" />

      <Label>Rating</Label>
      <Input {...register('rating')} type="number" />
      <ErrorMessage errors={errors} name="rating" />

      <Label>Tags</Label>
      <Textarea rows={3} {...register('tags')} />
      <ErrorMessage errors={errors} name="tags" />

      <Label>Content</Label>
      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange } }) => (
          <Editor {...{ value, onChange }} />
        )}
      />
      <ErrorMessage errors={errors} name="content" />

      {error && <Themed.p>{error}</Themed.p>}

      {post?.href && <Link href={post.href}>See post: {post.title}</Link>}

      <Flex sx={{ justifyContent: 'center', marginTop: 4 }}>
        <Button type="submit">{isButtonDisabled ? 'Saved' : 'Save'}</Button>
      </Flex>
    </Flex>
  );
};

export default PostEditor;
