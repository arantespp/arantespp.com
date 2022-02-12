import * as dateFns from 'date-fns';
import * as React from 'react';
import { Button, Flex, Text } from 'theme-ui';

import { useApiKey } from '../hooks/useApiKey';

export type ScheduledTweetCardProps = {
  text: string;
  scheduledAt: string;
  completedAt: string | null;
  id: string;
};

export const ScheduledTweetCard = ({
  id,
  scheduledAt,
  text,
  completedAt,
}: ScheduledTweetCardProps) => {
  const { apiKey } = useApiKey();

  const [isDeleting, setIsDeleting] = React.useState(false);

  const [isOnDeleteConfirmation, setIsOnDeleteConfirmation] =
    React.useState(false);

  const [isTweetDeleted, setIsTweetDeleted] = React.useState(false);

  const deleteScheduledTweet = async () => {
    try {
      setIsDeleting(true);

      await fetch('/api/tweet', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ scheduledTweetId: id }),
      }).then((res) => res.json());

      setIsTweetDeleted(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const renderFirstDeleteButton = !isOnDeleteConfirmation && !isTweetDeleted;

  const renderDeleteConfirmationButtons =
    isOnDeleteConfirmation && !isTweetDeleted;

  const disabled = isDeleting || isTweetDeleted;

  const firstLineText = (() => {
    const date = dateFns.format(new Date(scheduledAt), 'PP (EEEE) pp');

    if (completedAt) {
      return `[SENT] - ${date}`;
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
      <Text sx={{ fontStyle: 'italic', whiteSpace: 'pre-line', marginY: 3 }}>
        {text}
      </Text>
      {renderFirstDeleteButton && (
        <Button
          sx={{ cursor: 'pointer' }}
          onDoubleClick={() => setIsOnDeleteConfirmation(true)}
          disabled={disabled}
        >
          Delete (double click)
        </Button>
      )}
      {renderDeleteConfirmationButtons && (
        <Flex sx={{ justifyContent: 'center', gap: 3, width: '100%' }}>
          <Button onClick={deleteScheduledTweet} disabled={disabled}>
            Yes
          </Button>
          <Button
            onClick={() => setIsOnDeleteConfirmation(false)}
            disabled={disabled}
          >
            No
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
