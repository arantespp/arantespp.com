import * as dateFns from 'date-fns';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { getDateWithTimezone } from './getDateWithTimezone';
import { getToday } from './getToday';
import { readMarkdownFile } from './files';

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_PERSONAL as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_PERSONAL as string,
  },
  region: 'us-east-1',
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

const TableName = process.env.AWS_DYNAMODB_TABLE as string;

const JOURNAL_PK = 'journal';

const BACKUP_JOURNAL_PK = 'backup-journal';

const JOURNAL_FIRST_DATE = '2021-06-08';

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
  } = {
    /**
     * 8 because past one week plus the current day.
     */
    limit: 8,
  },
) => {
  const { Items = [] } = await ddbDocClient.send(
    new QueryCommand({
      TableName,
      ExpressionAttributeValues: {
        ':pk': JOURNAL_PK,
      },
      KeyConditionExpression: 'pk = :pk',
      Limit: limit,
      ScanIndexForward: false,
    }),
  );

  return (Items.filter(Boolean) as JournalFromDatabase[]).map(mapJournal);
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

  const keys = { pk: JOURNAL_PK, sk: dateKey };

  const { Item } = await ddbDocClient.send(
    new GetCommand({
      TableName,
      Key: keys,
    }),
  );

  if (!Item) {
    return mapJournal({ ...keys, content: '' });
  }

  return mapJournal(Item as JournalFromDatabase);
};

type SaveJournalArgs = {
  date: string;
  content: string;
};

const putJournal = async ({ date, content }: SaveJournalArgs) => {
  await ddbDocClient.send(
    new PutCommand({
      TableName,
      Item: {
        pk: JOURNAL_PK,
        sk: date,
        content,
      },
    }),
  );
};

export const getBackupJournal = async ({ date }: { date: string }) => {
  const { Item } = await ddbDocClient.send(
    new GetCommand({
      TableName,
      Key: { pk: BACKUP_JOURNAL_PK, sk: date },
    }),
  );

  if (!Item) {
    return [];
  }

  return Object.entries(Item.history).map(([dateTime, content]) => ({
    dateTime,
    content,
  }));
};

const backupJournal = async ({ date, content }: SaveJournalArgs) => {
  const now = dateFns.format(
    dateFns.roundToNearestMinutes(new Date(), { nearestTo: 5 }),
    'yyyy-MM-dd HH:mm',
  );

  try {
    await ddbDocClient.send(
      new UpdateCommand({
        TableName,
        Key: { pk: BACKUP_JOURNAL_PK, sk: date },
        UpdateExpression: 'SET #history.#now = :content',
        ExpressionAttributeNames: {
          '#history': 'history',
          '#now': now,
        },
        ExpressionAttributeValues: {
          ':content': content,
        },
      }),
    );
  } catch (err) {
    if (
      err.message ===
      'The document path provided in the update expression is invalid for update'
    ) {
      await ddbDocClient.send(
        new PutCommand({
          TableName,
          Item: {
            pk: BACKUP_JOURNAL_PK,
            sk: date,
            history: {
              [now]: content,
            },
          },
        }),
      );

      return;
    }

    console.error(err.message);
  }
};

export const saveJournal = async ({ date, content }: SaveJournalArgs) => {
  if (!content) {
    return;
  }

  await Promise.all([
    putJournal({ date, content }),
    backupJournal({ date, content }),
  ]);
};

export const getJournalsSummary = async ({ date }: { date: string | Date }) => {
  const parsedDate = getDateWithTimezone(date);

  const dates = [
    ['Last Ten Years', dateFns.subYears(parsedDate, 10)],
    ['Last Five Years', dateFns.subYears(parsedDate, 5)],
    ['Last Two Years', dateFns.subYears(parsedDate, 2)],
    ['Last Year', dateFns.subYears(parsedDate, 1)],
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
  )
    .filter(({ key, journal }) => {
      if (journal?.content) {
        return true;
      }

      if (
        ['Last Ten Years', 'Last Five Years', 'Last Two Years'].includes(key)
      ) {
        if (!journal?.content) {
          return false;
        }
      }

      return true;
    })
    .sort((journalA, journalB) => {
      if (!journalA.journal?.content) {
        return -10;
      }

      if (!journalB.journal?.content) {
        return 10;
      }

      return journalA.journal.date.localeCompare(journalB.journal.date);
    });

  return summary;
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type JournalsSummary = NonNullable<
  ThenArg<ReturnType<typeof getJournalsSummary>>
>;

export type JournalsSummaryKeys = JournalsSummary[number]['key'];

export const getStats = async ({
  from = JOURNAL_FIRST_DATE,
  to = getToday(),
}: {
  from?: string;
  to?: string;
} = {}) => {
  const { Items = [] } = await ddbDocClient.send(
    new QueryCommand({
      TableName,
      ExpressionAttributeValues: {
        ':pk': JOURNAL_PK,
      },
      KeyConditionExpression: 'pk = :pk',
      ProjectionExpression: 'sk',
    }),
  );

  const journalDays = Items.map(({ sk }) => sk);

  const parsedTo = dateFns.parse(to, 'yyyy-MM-dd', new Date());

  const currentDate = dateFns.parse(from, 'yyyy-MM-dd', new Date());

  let missingDates: string[] = [];

  let maxStreak = 0;

  let currentStreak = 0;

  while (!dateFns.isAfter(currentDate, parsedTo)) {
    const date = dateFns.format(currentDate, 'yyyy-MM-dd');

    const journalDate = journalDays.find((journalDay) => journalDay === date);

    currentStreak = journalDate ? currentStreak + 1 : 0;

    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
    }

    if (!journalDate) {
      missingDates.push(date);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  missingDates = missingDates.reverse();

  const groupedMissingDays = missingDates.reduce((acc, date) => {
    const [, , day] = date.split('-');

    const label = dateFns.format(
      dateFns.parse(date, 'yyyy-MM-dd', new Date()),
      'LLLL yyyy',
    );

    const group = acc.find((g) => g.label === label);

    if (!group) {
      acc.push({ label, dates: [{ date, day }] });
    } else {
      group.dates.push({ date, day });
    }

    return acc;
  }, [] as { label: string; dates: { date: string; day: string }[] }[]);

  return {
    missingDates,
    groupedMissingDays,
    maxStreak,
    allDays: journalDays.length,
  };
};

export const getAllQuestions = async () => {
  const { content = '' } =
    (await readMarkdownFile('journal/questions.md')) || {};

  const allQuestions = content
    .split('\n')
    .map((line) => line.trim().replace(/^- /, ''))
    .filter((line) => line.length > 0);

  return allQuestions;
};
