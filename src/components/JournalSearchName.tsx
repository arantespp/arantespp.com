import * as React from 'react';
import { Flex, Text } from 'theme-ui';
import { useApiKey } from '../hooks/useApiKey';
import { useQuery } from 'react-query';
import getCaretCoordinates from 'textarea-caret';

type Contact = {
  firstName: string;
  completeName: string;
  url: string;
  nickname?: string;
};

const useMonicaContacts = () => {
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

  const updateContactActivity = React.useCallback(
    async (args: { content: string; date: string; contact: Contact }) =>
      fetch(`/api/monica/contacts`, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: JSON.stringify(args),
      }),
    [apiKey],
  );

  return { searchMonicaContacts, updateContactActivity };
};

export const JournalSearchName = ({
  date,
  setContent,
  textAreaRef,
}: {
  date: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
}) => {
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  const [query, setQuery] = React.useState('');

  const { searchMonicaContacts, updateContactActivity } = useMonicaContacts();

  const { data } = useQuery(
    ['monica-contact', query],
    async ({ queryKey }) =>
      searchMonicaContacts({ query: queryKey[1].slice(1) }),
    { enabled: !!query, suspense: false },
  );

  const contacts = React.useMemo(() => data?.contacts || [], [data]);

  const showContacts = contacts.length > 0;

  const [hoveredContactIndex, setHoveredContactIndex] = React.useState(0);

  /**
   * Reset hoveredContactIndex when the search container disappears.
   */
  React.useEffect(() => {
    if (!showContacts) {
      setHoveredContactIndex(0);
    }
  }, [showContacts]);

  const [position, setPosition] = React.useState<
    | Partial<{
        top: number;
        left: number;
        right: number;
      }>
    | undefined
  >(undefined);

  /**
   * React controlled input cursor jumps
   * https://stackoverflow.com/a/68928267/8786986
   */
  const [cursor, setCursor] = React.useState<number | undefined>();

  React.useEffect(() => {
    if (textAreaRef.current && cursor) {
      textAreaRef.current.setSelectionRange(cursor, cursor);
    }
  }, [cursor, textAreaRef]);

  const replaceName = React.useCallback(
    (contact: Contact) => {
      if (!textAreaRef.current) {
        return;
      }

      const queryReplacer = `[${contact.nickname || contact.firstName}](${
        contact.url
      })`;

      const content = textAreaRef.current?.value.replace(query, queryReplacer);

      /**
       * Do not need to wait for the content to be updated, so `await` isn't
       * necessary.
       */
      updateContactActivity({ date, content, contact });

      const cursorPosition = textAreaRef.current.selectionStart;

      setContent(content);

      setQuery('');

      /**
       * Set the cursor position to the end of the replaced name.
       */
      setCursor(cursorPosition + queryReplacer.length - query.length);

      textAreaRef.current.focus();
    },
    [textAreaRef, query, setContent, updateContactActivity, date],
  );

  React.useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }

    /**
     * Use keys to navigate through the contacts and enter to select.
     */
    textAreaRef.current.onkeydown = (e) => {
      if (!showContacts) {
        return;
      }

      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'Enter') {
        replaceName(contacts[hoveredContactIndex]);
        return;
      }

      let move = 0;

      if (e.key === 'ArrowDown') {
        move = 1;
      }

      if (e.key === 'ArrowUp') {
        move = -1;
      }

      setHoveredContactIndex((i) => {
        if (i === contacts.length - 1 && move === 1) {
          return 0;
        }

        if (i === 0 && move === -1) {
          return contacts.length - 1;
        }

        return i + move;
      });
    };

    textAreaRef.current.oninput = (e) => {
      const textarea = e.target as HTMLTextAreaElement;

      /**
       * Set query.
       * https://stackoverflow.com/a/40338359/8786986
       */
      const slicedString = textarea.value.slice(0, textarea.selectionEnd);

      const result = /\S+$/.exec(slicedString);

      const wordQuery = (() => {
        let wq = result ? result[0] : undefined;

        if (!wq) {
          return;
        }

        wq = wq.replace(/['";:,.\/?\\-]$/, '');

        if (!wq.startsWith('@')) {
          return;
        }

        if (wq.length < 2) {
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
  }, [contacts, hoveredContactIndex, replaceName, showContacts, textAreaRef]);

  if (!showContacts) {
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
      {contacts.map((contact, index) => (
        <Text
          key={contact.url}
          sx={{
            fontWeight: hoveredContactIndex === index ? 'bold' : 'normal',
            whiteSpace: 'nowrap',
          }}
          onClick={() => {
            replaceName(contact);
          }}
          onMouseEnter={() => {
            setHoveredContactIndex(index);
          }}
        >
          {contact.completeName}
        </Text>
      ))}
    </Flex>
  );
};
