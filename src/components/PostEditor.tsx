import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Flex, Input, Label, Textarea, Themed } from 'theme-ui';
import * as yup from 'yup';

import type { Post } from '../lib/files';

import Editor from './Editor';

const schema = yup.object({
  group: yup.string(),
  title: yup.string().required(),
  excerpt: yup.string().required(),
  rating: yup.number().positive().integer().required(),
  tags: yup.string().required(),
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
  const { control, handleSubmit, register, reset } = useForm<PostForm>({
    defaultValues: { rating: 3, group: 'zettelkasten' },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (post) {
      const { title, excerpt, rating, tags, content, group } = post;
      reset({ title, excerpt, rating, tags: tags.join('; '), content, group });
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
      <Label>Excerpt</Label>
      <Textarea rows={3} {...register('excerpt')} />
      <Label>Rating</Label>
      <Input {...register('rating')} type="number" />
      <Label>Tags</Label>
      <Textarea rows={3} {...register('tags')} />
      <Label>Content</Label>
      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange } }) => (
          <Editor {...{ value, onChange }} />
        )}
      />
      {error && <Themed.p>{error}</Themed.p>}
      <Flex sx={{ justifyContent: 'center', marginTop: 4 }}>
        <Button type="submit">Save</Button>
      </Flex>
    </Flex>
  );
};

export default PostEditor;
