import * as React from 'react';
import {
  DailyPostEditor,
  DailyPostFormValues,
} from '../components/DailyPostEditor';
import { DailyPostInput, DailyPostOutput } from '../../lib/dailyPost';
import { Flex } from 'theme-ui';
import { useApiKey } from '../hooks/useApiKey';
import { useLinkedInToken } from '../hooks/useLinkedInToken';
import { useMutation } from 'react-query';
import Link from '../components/Link';

const useDailyPost = () => {
  const { apiKey } = useApiKey();

  const token = useLinkedInToken();

  const [dailyPost, setDailyPost] = React.useState<DailyPostOutput | null>(
    null,
  );

  const mutation = useMutation(
    async (formData: DailyPostFormValues) => {
      const dailyPostInput: DailyPostInput = {
        ...formData,
        linkedInAccessToken: token?.accessToken as string,
      };

      const response = await fetch('/api/dailyPost', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: JSON.stringify(dailyPostInput),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.message);
      }

      return data;
    },
    {
      onSuccess: setDailyPost,
    },
  );

  return { postDailyPost: mutation.mutateAsync, dailyPost, ...mutation };
};

const DailyPost = () => {
  const { postDailyPost, dailyPost, error } = useDailyPost();

  const errorMessage = (error as any)?.message;

  return (
    <Flex sx={{ flexDirection: 'column', gap: 3 }}>
      <DailyPostEditor onSubmit={postDailyPost} />
      {dailyPost?.linkedInPostUrl && (
        <Link href={dailyPost?.linkedInPostUrl}>LinkedIn</Link>
      )}
      {dailyPost?.tweetUrl && <Link href={dailyPost?.tweetUrl}>Twitter</Link>}
      {errorMessage && <div>{errorMessage}</div>}
    </Flex>
  );
};

export default DailyPost;
