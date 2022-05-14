import * as React from 'react';
import * as dateFns from 'date-fns';
import { Button, Flex, Text } from 'theme-ui';
import { TweetEditor } from './TweetEditor';
import { useApiKey } from '../hooks/useApiKey';

export type ScheduledTweetProps = {
  text: string;
  scheduledAt: string;
  completedAt: string | null;
  id: string;
  idStr: string;
};

export type ScheduledTweetCardProps = {
  tweet: ScheduledTweetProps;
  onUpdated?: (tweet: ScheduledTweetProps) => void;
  cardNumber?: number;
};

export const ScheduledTweetCard = ({
  tweet: { idStr: id, scheduledAt, text, completedAt },
  onUpdated,
  cardNumber,
}: ScheduledTweetCardProps) => {
  const { apiKey } = useApiKey();

  const [isLoading, setIsLoading] = React.useState(false);

  const [isOnUpdatingMode, setIsOnUpdatingMode] = React.useState(false);

  const [updateTweetText, setUpdateTweetText] = React.useState(text);

  const [isOnDeleteConfirmation, setIsOnDeleteConfirmation] =
    React.useState(false);

  const [isTweetDeleted, setIsTweetDeleted] = React.useState(false);

  const deleteScheduledTweet = async () => {
    try {
      setIsLoading(true);

      await fetch('/api/tweet', {
        method: 'DELETE',
        headers: {
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ scheduledTweetId: id }),
      }).then((res) => res.json());

      setIsTweetDeleted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTweet = async () => {
    try {
      setIsLoading(true);

      const data = await fetch('/api/tweet', {
        method: 'PUT',
        headers: {
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          scheduledTweetId: id,
          text: updateTweetText,
        }),
      }).then((res) => res.json());

      onUpdated?.(data);

      setIsOnUpdatingMode(false);
    } finally {
      setIsLoading(false);
    }
  };

  const renderUpdateAndDeleteButtons =
    !isOnUpdatingMode && !isOnDeleteConfirmation && !isTweetDeleted;

  const renderDeleteConfirmationButtons =
    isOnDeleteConfirmation && !isTweetDeleted;

  const disabled = isLoading || isTweetDeleted;

  const firstLineText = (() => {
    const date = dateFns.format(new Date(scheduledAt), 'PP (EEEE) pp');

    if (completedAt) {
      return `[SENT] - ${date}`;
    }

    if (cardNumber) {
      return `#${cardNumber} ${date}`;
    }

    return date;
  })();

  return (
    <Flex
      sx={{
        marginBottom: 4,
        flexDirection: 'column',
        borderColor: 'muted',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 4,
      }}
    >
      <Text
        sx={{
          fontWeight: 'bold',
          textDecoration: isTweetDeleted ? 'line-through' : '',
        }}
      >
        {firstLineText}
      </Text>

      {isTweetDeleted && (
        <Text sx={{ fontWeight: 'bold' }}>This tweet was deleted!</Text>
      )}

      {!isOnUpdatingMode && (
        <Text sx={{ fontStyle: 'italic', whiteSpace: 'pre-line', marginY: 3 }}>
          {text}
        </Text>
      )}

      {isOnUpdatingMode && (
        <TweetEditor value={updateTweetText} setValue={setUpdateTweetText} />
      )}

      <Flex
        sx={{ gap: 3, alignSelf: 'center', flexDirection: ['column', 'row'] }}
      >
        {renderUpdateAndDeleteButtons && (
          <>
            <Button
              onClick={() => setIsOnUpdatingMode(true)}
              disabled={disabled}
              sx={{ backgroundColor: 'secondary' }}
            >
              Update
            </Button>
            <Button
              onDoubleClick={() => setIsOnDeleteConfirmation(true)}
              disabled={disabled}
            >
              Delete (double click)
            </Button>
          </>
        )}
        {isOnUpdatingMode && (
          <>
            <Button disabled={disabled} onClick={updateTweet}>
              Update
            </Button>
            <Button
              sx={{ backgroundColor: 'secondary' }}
              disabled={disabled}
              onClick={() => {
                setIsOnUpdatingMode(false);
                setUpdateTweetText(text);
              }}
            >
              Cancel
            </Button>
          </>
        )}
        {renderDeleteConfirmationButtons && (
          <>
            <Button
              sx={{ backgroundColor: 'primary' }}
              onClick={deleteScheduledTweet}
              disabled={disabled}
            >
              Yes
            </Button>
            <Button
              sx={{ backgroundColor: 'secondary' }}
              onClick={() => setIsOnDeleteConfirmation(false)}
              disabled={disabled}
            >
              No
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};
