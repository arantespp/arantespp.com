import * as React from 'react';
import { useQuery } from 'react-query';
import getCaretCoordinates from 'textarea-caret';

import { Flex, Text } from 'theme-ui';

import { useApiKey } from '../hooks/useApiKey';

type Contact = { firstName: string; completeName: string; url: string };

const useSearchMonicaContacts = () => {
  const { apiKey } = useApiKey();

  const searchMonicaContacts = async ({ query }: { query: string }) => {
    const response = await fetch(`/api/monica/contacts?query=${query}`, {
      headers: {
        'x-api-key': apiKey,
      },
    });
    const data: {
      contacts: Contact[];
    } = await response.json();
    return data;
  };

  return { searchMonicaContacts };
};

export const JournalSearchName = ({
  textAreaRef,
}: {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}) => {
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  const [query, setQuery] = React.useState('');

  const { searchMonicaContacts } = useSearchMonicaContacts();

  const { data } = useQuery(
    ['monica-contact', query],
    async ({ queryKey }) =>
      searchMonicaContacts({ query: queryKey[1].slice(1) }),
    { enabled: !!query },
  );

  const contacts = data?.contacts || [];

  const [position, setPosition] = React.useState<
    | Partial<{
        top: number;
        left: number;
        right: number;
      }>
    | undefined
  >(undefined);

  React.useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.oninput = (e) => {
      const textarea = e.target as HTMLTextAreaElement;

      /**
       * Set query.
       * https://stackoverflow.com/a/40338359/8786986
       */
      let endPos = textarea.value.indexOf(' ', textarea.selectionEnd);

      if (endPos === -1) {
        endPos = textarea.value.length;
      }

      const result = /\S+$/.exec(textarea.value.slice(0, endPos));

      const wordQuery = (() => {
        let wq = result ? result[0] : undefined;

        if (!wq) {
          return;
        }

        wq = wq.replace(/['";:,.\/?\\-]$/, '');

        if (!wq.startsWith('@')) {
          return;
        }

        if (wq.length < 3) {
          return;
        }

        return wq;
      })();

      /**
       * Do not set position if query doesn't exist.
       */
      if (!wordQuery) {
        setQuery('');
        setPosition(undefined);
        return;
      }

      setQuery(wordQuery);

      /**
       * Set position.
       */
      const caret = getCaretCoordinates(textarea, textarea?.selectionEnd);
      const rect = textarea?.getBoundingClientRect();

      const { width: searchContainerWidth } =
        searchContainerRef.current?.getBoundingClientRect() || {};

      const windowWidth = window.innerWidth;

      const { left = undefined, right = undefined } = (() => {
        if (caret.left + rect.left + searchContainerWidth + 30 > windowWidth) {
          return {
            right: 16,
          };
        }

        return {
          left: caret.left + rect.left,
        };
      })();

      const top = caret.top + rect.top + window.scrollY + caret.height;

      setPosition({ top, left, right });
    };
  }, [textAreaRef]);

  const replaceName = (contact: Contact) => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.value = textAreaRef.current?.value.replace(
      query,
      `[${contact.firstName}](${contact.url})`,
    );

    setQuery('');

    textAreaRef.current?.focus();
  };

  if (contacts.length === 0) {
    return null;
  }

  return (
    <Flex
      ref={searchContainerRef}
      tabIndex={1}
      sx={{
        backgroundColor: 'background',
        flexDirection: 'column',
        gap: 1,
        position: 'absolute',
        padding: 2,
        border: '1px solid black',
        ...position,
      }}
    >
      {contacts.map((contact) => (
        <Text
          key={contact.url}
          sx={{ ':hover': { fontWeight: 'bold' } }}
          onClick={() => {
            replaceName(contact);
          }}
        >
          {contact.completeName}
        </Text>
      ))}
    </Flex>
  );
};
