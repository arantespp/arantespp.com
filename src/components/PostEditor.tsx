import * as React from 'react';
import * as dateFns from 'date-fns';
import * as yup from 'yup';
import {
  Button,
  Checkbox,
  Flex,
  Label,
  Select,
  Text,
  Textarea,
  Themed,
} from 'theme-ui';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { GROUPS, Group } from '../../lib/groups';
import { GeneratePostMetadata } from '../../lib/ai';
import { Post, SavePostParams } from '../../lib/files';
import { yupResolver } from '@hookform/resolvers/yup';
import Editor from './Editor';
import Link from './Link';

const schema = yup.object({
  group: yup
    .mixed<Group>()
    .oneOf<Group>([...GROUPS])
    .required(),
  title: yup.string().required(),
  excerpt: yup.string().test(
    'len',
    ({ value }) =>
      'Should be between 50 and 160 characters. Current: ' + value.length,
    (val) => {
      if (val === undefined) {
        return true;
      }

      /**
       * https://moz.com/learn/seo/meta-description
       */
      return val.length === 0 || (val.length >= 50 && val.length <= 160);
    },
  ),
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

const putPost = async (post: SavePostParams) => {
  return fetch(`/api/post`, {
    method: 'PUT',
    body: JSON.stringify(post),
  });
};

const generatePostMetadata = async ({ content }: { content: string }) => {
  if (!content) {
    return {};
  }

  const query = new URLSearchParams({ content });

  const response = await fetch(`/api/ai/post/metadata?${query.toString()}`);

  if (!response.ok) {
    return {};
  }

  const metadata: GeneratePostMetadata = await response.json();

  return metadata;
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
    getValues,
  } = useForm<PostForm>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const title = watch('title');

  const group = watch('group') as Group;

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
        : { ...defaultValues, title },
      {
        keepDefaultValues: false,
        keepDirty: false,
      },
    );
  }, [defaultValues, post, reset, title]);

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

        const response = await putPost({
          ...data,
          tags: (data.tags || '').split(';'),
          book: undefined,
        });

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

  const [isFetchingMetadata, setIsFetchingMetadata] = React.useState(false);

  const [insight, setInsight] = React.useState('...');

  /**
   * Generate post metadata callback.
   */
  const onGeneratePostMetadata = React.useCallback(async () => {
    setIsFetchingMetadata(true);

    const { content, title } = getValues();

    const metadata = await generatePostMetadata({
      content: [title, content].join('\n'),
    });

    if (metadata) {
      /**
       * Set isDirty to true to trigger the auto-save.
       */
      setInsight(metadata.insight || '');
    }

    setIsFetchingMetadata(false);
  }, [getValues]);

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

      <Label>Group</Label>
      <Select
        {...register('group')}
        disabled={!!post?.group}
        sx={{ pointerEvents: post?.group ? 'none' : 'auto' }}
      >
        {GROUPS.map((groupOption) => (
          <option key={groupOption} value={groupOption}>
            {groupOption}
          </option>
        ))}
      </Select>
      <ErrorMessage errors={errors} name="group" />

      <Label>Content</Label>
      <Controller
        control={control}
        name="content"
        render={({ field: { value, onChange } }) => (
          <Editor {...{ value, onChange, isInvalid: !!errors.content }} />
        )}
      />

      <ErrorMessage errors={errors} name="content" />

      <Label>
        <Checkbox {...register('draft')} />
        Draft?
      </Label>

      <Flex sx={{ justifyContent: 'center', marginY: 2, gap: 3 }}>
        <Button
          type="button"
          disabled={isFetchingMetadata}
          onClick={onGeneratePostMetadata}
        >
          Insights
        </Button>
      </Flex>

      <Label>Excerpt</Label>
      <Textarea rows={3} {...register('excerpt')} />
      <ErrorMessage errors={errors} name="excerpt" />

      <Label>Tags</Label>
      <Textarea rows={3} {...register('tags')} />
      <ErrorMessage errors={errors} name="tags" />

      {error && <Themed.p>{error}</Themed.p>}

      <Label>Insight</Label>
      <Text sx={{ whiteSpace: 'pre-wrap' }}>{insight}</Text>

      <Flex sx={{ justifyContent: 'center', marginY: 4, gap: 3 }}>
        <Button type="submit">Save</Button>
      </Flex>

      {currentPost?.href && (
        <Flex sx={{ fontStyle: 'italic', flexDirection: 'column' }}>
          <Link
            href={currentPost.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text>
              See post: {currentPost.title} (updated at {lastAutoSaveTime})
            </Text>
          </Link>
          <Text
            sx={{ fontStyle: 'italic', cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText(currentPost.href);
            }}
          >
            {currentPost.href}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default React.memo(PostEditor);
