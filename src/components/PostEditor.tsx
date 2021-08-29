import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex, Input, Label, Select, Textarea, Themed } from 'theme-ui';
import * as yup from 'yup';

import type { Post } from '../lib/files';
import { GROUPS } from '../lib/groups';

import Editor from './Editor';

const schema = yup.object({
  group: yup
    .string()
    .oneOf([...GROUPS])
    .required(),
  title: yup.string().required(),
  excerpt: yup.string(),
  rating: yup.number().positive().integer().required(),
  tags: yup.string(),
  content: yup.string().required(),
});

export type PostForm = yup.Asserts<typeof schema>;

const putPost = async (note: PostForm) => {
  return fetch(`/api/post`, {
    method: 'PUT',
    body: JSON.stringify(note),
  });
};

const PostEditor = ({
  post,
  onSave,
}: {
  post?: Post;
  onSave: (response: any) => void;
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<PostForm>({
    defaultValues: { rating: 3, group: '' },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (post) {
      const { title, excerpt, rating, tags, content, group } = post;
      reset(
        { title, excerpt, rating, tags: tags.join('; '), content, group },
        { keepDefaultValues: false },
      );
    }
  }, [post, reset]);

  const [error, setError] = React.useState('');

  const onSubmit = async (data: PostForm) => {
    try {
      setError('');
      const response = await putPost({ ...data });
      const json = await response.json();
      if (response.status === 200) {
        onSave(json);
      } else {
        throw json;
      }
    } catch (err) {
      setError(err.message);
    }
  };

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
      <Select defaultValue="" {...register('group')}>
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

      <Flex sx={{ justifyContent: 'center', marginTop: 4 }}>
        <Button type="submit">Save</Button>
      </Flex>
    </Flex>
  );
};

export default PostEditor;
