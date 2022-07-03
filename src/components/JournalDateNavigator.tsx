import * as React from 'react';
import * as dateFns from 'date-fns';
import { Button, Flex, Input, Text } from 'theme-ui';
import { useQueryParamsDateOrToday } from '../hooks/useQueryParamsDateOrToday';
import Link from './Link';

export const JournalDateNavigator = ({
  date,
  setDate,
}: {
  date: string;
  setDate: (date: string) => void;
}) => {
  const { today } = useQueryParamsDateOrToday();

  const addToDate = (add: dateFns.Duration) => () => {
    const format = 'yyyy-MM-dd';

    const parsedDate = dateFns.parse(date, format, new Date());

    const addDay = dateFns.add(parsedDate, add);

    setDate(dateFns.format(addDay, format));
  };

  return (
    <Flex sx={{ flexDirection: 'column', paddingBottom: 4 }}>
      <Link href={`/journal/${date}`}>
        <Text>
          {dateFns.format(
            dateFns.parse(date, 'yyyy-MM-dd', new Date()),
            'PPPP',
          )}
        </Text>
      </Link>
      <Flex
        sx={{
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: ['center', 'flex-start'],
          button: {
            backgroundColor: 'background',
            color: 'text',
            borderColor: 'text',
            border: '1px solid',
            ':hover': {
              backgroundColor: 'primary',
              borderColor: 'primary',
              color: 'background',
            },
          },
        }}
      >
        <Button onClick={addToDate({ months: -1 })}>Prev Month</Button>
        <Button onClick={addToDate({ days: -1 })}>Prev Day</Button>
        <Button onClick={() => setDate(today)}>Today</Button>
        <Button onClick={addToDate({ days: 1 })}>Next Day</Button>
        <Button onClick={addToDate({ months: 1 })}>Next Month</Button>
      </Flex>
    </Flex>
  );
};
