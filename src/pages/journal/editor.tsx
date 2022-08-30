import * as React from 'react';
import { Box, Flex, Text, Themed } from 'theme-ui';
import { InferGetStaticPropsType } from 'next';
import { Journal } from '../../../lib/journal';
import { JournalDateNavigator } from '../../components/JournalDateNavigator';
import { JournalSearchName } from '../../components/JournalSearchName';
import { Loading } from '../../components/Loading';
import { NextSeo } from 'next-seo';
import { readMarkdownFile } from '../../../lib/files';
import { useApiKey } from '../../hooks/useApiKey';
import { useDateInput } from '../../hooks/useDateInput';
import { useDebounce } from 'use-debounce';
import { useIdleTimer } from 'react-idle-timer';
import { useQuery, useQueryClient } from 'react-query';
import { useQueryParamsDateOrToday } from '../../hooks/useQueryParamsDateOrToday';
import Editor from '../../components/Editor';
import ErrorMessage from '../../components/ErrorMessage';
import JournalComponent from '../../components/Journal';
import Link from '../../components/Link';
import Router, { useRouter } from 'next/router';

export const getStaticProps = async () => {
  const { content = '' } =
    (await readMarkdownFile('journal/questions.md')) || {};

  const questions = content
    .split('\n')
    .map((line) => line.trim().replace(/^- /, ''))
    .filter((line) => line.length > 0);

  return {
    props: {
      questions,
    },
  };
};

const AUTO_SAVE_DELAY = 200;

const useAutoSave = ({ content, date }: { content: string; date: string }) => {
  const { apiKey } = useApiKey();

  const [error, setError] = React.useState('');

  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (content && date && apiKey) {
      const timeout = setTimeout(async () => {
        setIsSaving(true);
        setError('');

        const response = await fetch('/api/journal', {
          method: 'PUT',
          headers: {
            'x-api-key': apiKey,
          },
          body: JSON.stringify({ date, content }),
        });

        const json = await response.json();

        if (response.status !== 200) {
          setError(`Error: ${json.error}`);
        }

        setIsSaving(false);
      }, AUTO_SAVE_DELAY);

      return () => clearTimeout(timeout);
    }
    /**
     * Only save on content change.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  /**
   * Warn User for Unsaved Form before Route Change
   * https://stackoverflow.com/a/69855350/8786986
   */
  React.useEffect(() => {
    const confirmationMessage = 'Saving changes...';

    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };

    const beforeRouteHandler = (url: string) => {
      if (Router.pathname !== url && !confirm(confirmationMessage)) {
        Router.events.emit('routeChangeError');
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
      }
    };

    if (isSaving) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
      Router.events.on('routeChangeStart', beforeRouteHandler);
    } else {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      Router.events.off('routeChangeStart', beforeRouteHandler);
    }

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
      Router.events.off('routeChangeStart', beforeRouteHandler);
    };
  }, [isSaving]);

  return { error, isSaving };
};

const getQuestionsContent = ({ questions }: { questions: string[] }) => {
  return (
    questions.map((question) => `**${question}**`).join('\n\n') + '\n\n---\n\n'
  );
};

const useContent = ({
  date,
  questions,
}: {
  date: string;
  questions: string[];
}) => {
  const queryClient = useQueryClient();

  const { apiKey } = useApiKey();

  const queryKey = [`/api/journal?date=${date}`, apiKey];

  const { data, isFetched } = useQuery(
    queryKey,
    async ({ queryKey }) =>
      fetch(queryKey[0], {
        headers: {
          'x-api-key': queryKey[1],
        },
      }).then((r): Promise<{ journal: Journal }> => r.json()),
    { enabled: !!apiKey },
  );

  const contentFromApi = data?.journal?.content || '';

  const isLoadingContent = !isFetched;

  const [content, setContent] = React.useState('');

  const [wasInitialContentSet, setWasInitialContentSet] = React.useState(false);

  /**
   * Reset when date changes.
   */
  React.useEffect(() => {
    setWasInitialContentSet(false);
  }, [date]);

  /**
   * Set initial content if it hasn't been set yet.
   */
  React.useEffect(() => {
    if (!date) {
      return;
    }

    if (isLoadingContent) {
      return;
    }

    if (wasInitialContentSet) {
      return;
    }

    setContent(contentFromApi || getQuestionsContent({ questions }));

    setWasInitialContentSet(true);
  }, [contentFromApi, date, isLoadingContent, questions, wasInitialContentSet]);

  /**
   * Update the cache with the new content.
   */
  React.useEffect(() => {
    if (!queryKey[1]) {
      return;
    }

    const queryData = queryClient.getQueryData<{
      journal: any;
    }>(queryKey);

    if (!queryData || !queryData.journal) {
      return;
    }

    if (queryData.journal.content === content) {
      return;
    }

    queryClient.setQueryData(queryKey, {
      journal: { ...queryData.journal, content },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return { content, setContent, date, isLoadingContent };
};

const EditorWithContent = ({
  date,
  questions,
}: {
  date: string;
  questions: string[];
}) => {
  const { content, setContent, isLoadingContent } = useContent({
    date,
    questions,
  });

  const { error, isSaving } = useAutoSave({ content, date });

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [debouncedIsSaving] = useDebounce(isSaving, 1000);

  const isValid = !!content;

  return (
    <>
      <Box sx={{ marginY: 3 }}>
        <Editor
          ref={textAreaRef}
          isValid={isValid}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          autoFocus
        />
      </Box>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Flex sx={{ gap: 3 }}>
          <Link href="/journal">Summary</Link>
        </Flex>
        <Text
          sx={
            debouncedIsSaving || isLoadingContent || !isValid
              ? { color: 'muted', fontStyle: 'italic' }
              : { color: 'text' }
          }
        >
          {'Saved'}
        </Text>
      </Flex>
      <JournalSearchName {...{ date, setContent, textAreaRef }} />
      <ErrorMessage error={error} />
      <Box sx={{ marginTop: 5 }}>
        <JournalComponent markdown={content} title={date} />
      </Box>
    </>
  );
};

const MemoizedEditorWithContent = React.memo(EditorWithContent);

const useIdleRedirect = ({ date }: { date: string }) => {
  const { push } = useRouter();

  const handleOnIdle = () => {
    push(`/journal/${date}`);
  };

  useIdleTimer({
    timeout: 1000 * 60 * 3, // 3 minutes
    onIdle: handleOnIdle,
  });
};

const JournalEditor = ({
  questions,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { date } = useQueryParamsDateOrToday();

  useIdleRedirect({ date });

  const { date: dateInput, setDate: setDateInput } = useDateInput(date);

  const title = 'Journal Editor';

  // const disableEditor =
  //   isLoadingContent ||
  //   /**
  //    * `date` and `dateInput` can be different because user can type anything
  //    * or `dateInput` can be a future date. In this case, user can't write.
  //    */
  //   date !== dateInput;

  return (
    <>
      <NextSeo noindex nofollow title={title} />
      <Themed.h1>{title}</Themed.h1>
      <JournalDateNavigator date={dateInput} setDate={setDateInput} />
      <React.Suspense fallback={<Loading />}>
        <MemoizedEditorWithContent date={date} questions={questions} />
      </React.Suspense>
    </>
  );
};

export default JournalEditor;
