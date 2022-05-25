import * as React from 'react';
import * as dateFns from 'date-fns';
import { Box, Flex, Input, Text, Themed } from 'theme-ui';
import { Journal } from '../../../lib/journal';
import { JournalSearchName } from '../../components/JournalSearchName';
import { JournalSummary } from '../../components/JournalSummary';
import { Loading } from '../../components/Loading';
import { NextSeo } from 'next-seo';
import { useApiKey } from '../../hooks/useApiKey';
import { useDateInput } from '../../hooks/useDateInput';
import { useQuery } from 'react-query';
import { useQueryParamsDateOrToday } from '../../hooks/useQueryParamsDateOrToday';
import Editor from '../../components/Editor';
import ErrorMessage from '../../components/ErrorMessage';
import Link from '../../components/Link';
import Router from 'next/router';

const AUTO_SAVE_DELAY = 500;

const useAutoSave = ({ content, date }: { content: string; date: string }) => {
  const { apiKey } = useApiKey();

  const [error, setError] = React.useState('');

  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (content && date && apiKey) {
      setIsSaving(true);

      const timeout = setTimeout(async () => {
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
  }, [apiKey, content, date]);

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

const useContent = ({ date }: { date: string }) => {
  const { apiKey } = useApiKey();

  const { data, isLoading: isLoadingContent } = useQuery(
    [`/api/journal?date=${date}`, apiKey],
    async ({ queryKey }) =>
      fetch(queryKey[0], {
        headers: {
          'x-api-key': queryKey[1],
        },
      }).then((r): Promise<{ journal: Journal }> => r.json()),
    { enabled: !!apiKey },
  );

  const contentFromApi = data?.journal?.content || '';

  const [content, setContent] = React.useState(contentFromApi);

  React.useEffect(() => {
    if (!contentFromApi || !date) {
      return setContent('');
    }

    setContent(contentFromApi);
  }, [date, contentFromApi]);

  return { content, setContent, date, isLoadingContent };
};

const EditorWithContent = ({ date }: { date: string }) => {
  const { content, setContent, isLoadingContent } = useContent({ date });

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const { error, isSaving } = useAutoSave({ content, date });

  return (
    <>
      <Box sx={{ marginY: 4 }}>
        <Editor
          ref={textAreaRef}
          isValid={!!content}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          autoFocus
        />
      </Box>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Flex sx={{ gap: 3 }}>
          <Link href="/journal/all">All</Link>
          <Link href="/journal">Summary</Link>
        </Flex>
        <Text
          sx={
            isSaving || isLoadingContent
              ? { color: 'muted', fontStyle: 'italic' }
              : { color: 'text' }
          }
        >
          {'Saved'}
        </Text>
      </Flex>
      <JournalSearchName {...{ date, setContent, textAreaRef }} />
      <ErrorMessage error={error} />
    </>
  );
};

const JournalEditor = () => {
  const { date } = useQueryParamsDateOrToday();

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
      <Box sx={{ marginY: 2 }}>
        <Link href={`/journal/${date}`}>
          <Text>
            {dateFns.format(
              dateFns.parse(date, 'yyyy-MM-dd', new Date()),
              'PPPP',
            )}
          </Text>
        </Link>
      </Box>
      <Input
        value={dateInput}
        onChange={(e) => {
          setDateInput(e.target.value);
        }}
      />
      <React.Suspense fallback={<Loading />}>
        <EditorWithContent date={date} />
      </React.Suspense>
      <Box sx={{ marginTop: 5 }}>
        <React.Suspense fallback={<Loading />}>
          <JournalSummary date={date} />
        </React.Suspense>
      </Box>
    </>
  );
};

export default JournalEditor;
