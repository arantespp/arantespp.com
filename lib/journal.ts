import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import * as dateFns from 'date-fns';

import { getDateWithTimezone } from './getDateWithTimezone';

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_PERSONAL as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_PERSONAL as string,
  },
  region: 'us-east-1',
});

const TableName = process.env.AWS_DYNAMODB_TABLE as string;

const pk = 'journal';

type JournalFromDatabase = { pk: string; sk: string; content: string };

const mapJournal = ({ sk: date, content }: JournalFromDatabase) => {
  try {
    const formattedDate = dateFns.format(getDateWithTimezone(date), 'PPPP');
    return { content, date, formattedDate };
  } catch {
    return undefined;
  }
};

export type Journal = ReturnType<typeof mapJournal>;

export const getJournals = async (
  {
    limit,
  }: {
    limit?: number;
  } = { limit: 7 },
) => {
  const { Items = [] } = await client.send(
    new QueryCommand({
      TableName,
      ExpressionAttributeValues: marshall({
        ':pk': pk,
      }),
      KeyConditionExpression: 'pk = :pk',
      Limit: limit,
      ScanIndexForward: false,
    }),
  );

  return Items.map((journal) =>
    mapJournal(unmarshall(journal) as JournalFromDatabase),
  ).filter(Boolean);
};

const journalDateToSlug = (parsed: Date) =>
  dateFns.format(parsed, 'yyyy-MM-dd').split('-');

export const getJournal = async ({ date }: { date: string | Date }) => {
  const [year, month, day] = (() => {
    if (typeof date === 'string') {
      return date.split('-');
    }

    const parsedDate = getDateWithTimezone(date);
    return journalDateToSlug(parsedDate);
  })();

  if (!year || !month || !day) {
    throw new Error('Invalid date');
  }

  const dateKey = `${year}-${month}-${day}`;

  const { Item } = await client.send(
    new GetItemCommand({
      TableName,
      Key: marshall({ pk, sk: dateKey }),
    }),
  );

  if (!Item) {
    return undefined;
  }

  return mapJournal(unmarshall(Item) as JournalFromDatabase);
};

export const saveJournal = async ({
  date,
  content,
}: {
  date: string;
  content: string;
}) => {
  await client.send(
    new PutItemCommand({
      TableName,
      Item: marshall({
        pk,
        sk: date,
        content,
      }),
    }),
  );
};

export const getJournalsSummary = async ({ date }: { date: string | Date }) => {
  const parsedDate = getDateWithTimezone(date);

  const dates = [
    ['Last Ten Years', dateFns.subYears(parsedDate, 10)],
    ['Last Five Years', dateFns.subYears(parsedDate, 5)],
    ['Last Two Years', dateFns.subYears(parsedDate, 2)],
    ['Last Year', dateFns.subYears(parsedDate, 1)],
    ['Last Semester', dateFns.subMonths(parsedDate, 6)],
    ['Last Month', dateFns.subMonths(parsedDate, 1)],
    ['Last Week', dateFns.subWeeks(parsedDate, 1)],
    ['Yesterday', dateFns.subDays(parsedDate, 1)],
    ['Today', parsedDate],
  ] as const;

  const summary = (
    await Promise.all(
      dates.map(async ([key, dt]) => {
        return { key, journal: await getJournal({ date: dt }) };
      }),
    )
  ).filter(({ journal }) => !!journal);

  return summary;
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type JournalsSummary = NonNullable<
  ThenArg<ReturnType<typeof getJournalsSummary>>
>;
