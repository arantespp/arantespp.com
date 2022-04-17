import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
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

const JOURNAL_PK = 'journal';

const BACKUP_JOURNAL_PK = 'backup-journal';

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
        ':pk': JOURNAL_PK,
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
      Key: marshall({ pk: JOURNAL_PK, sk: dateKey }),
    }),
  );

  if (!Item) {
    return undefined;
  }

  return mapJournal(unmarshall(Item) as JournalFromDatabase);
};

type SaveJournalArgs = {
  date: string;
  content: string;
};

const putJournal = async ({ date, content }: SaveJournalArgs) => {
  await client.send(
    new PutItemCommand({
      TableName,
      Item: marshall({
        pk: JOURNAL_PK,
        sk: date,
        content,
      }),
    }),
  );
};

/**
 * If someday I need it.
 */
// const getBackupJournal = async ({ date }: { date: string }) => {
//   const { Item } = await client.send(
//     new GetItemCommand({
//       TableName,
//       Key: marshall({ pk: BACKUP_JOURNAL_PK, sk: date }),
//     }),
//   );

//   if (!Item) {
//     return undefined;
//   }

//   return unmarshall(Item);
// };

const backupJournal = async ({ date, content }: SaveJournalArgs) => {
  const now = dateFns.format(
    dateFns.roundToNearestMinutes(new Date()),
    'yyyy-MM-dd HH:mm',
  );

  try {
    await client.send(
      new UpdateItemCommand({
        TableName,
        Key: marshall({ pk: BACKUP_JOURNAL_PK, sk: date }),
        UpdateExpression: 'SET #history.#now = :content',
        ExpressionAttributeNames: {
          '#history': 'history',
          '#now': now,
        },
        ExpressionAttributeValues: marshall({
          ':content': content,
        }),
      }),
    );
  } catch (err) {
    if (
      err.message ===
      'The document path provided in the update expression is invalid for update'
    ) {
      await client.send(
        new PutItemCommand({
          TableName,
          Item: marshall({
            pk: BACKUP_JOURNAL_PK,
            sk: date,
            history: {
              [now]: content,
            },
          }),
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

// Levantei 6h15 e comecei e voltei a ler Principles, a parte que falava de ser mente aberta. Em uma das passagens, o livro fala de você usar a dor mental como um sinal de que você não está sendo mente aberta. Quando alguém fala algo oposto da sua visão, você pode sentir uma dor porque o seu ego foi atacado. Quando isso ocorre, pode ser porque você está errado e a outra pessoa está certa. A vantagem de meditar é conseguir perceber estas dores ou quando o seu eu baixo nível (emoções) toma conta. Eu lembro que aconteceu isso comigo quando o Ennio falou do botão do Siflor.

// No dia que ele falou que eu deixei passar o botão, eu senti o ego ferido, mas eu consegui perceber isso na hora. No fundo eu estava errado.

// **A pior combinação de uma pessoa é quando ela é mente fechada e tem muitos pontos cegos.**

// ---

// Tive um insight do que são os 4 corpos na minha meditação hoje. Físico é o corpo. Emocional é a parte primitiva do cérebro. Mental é o neocortex. Espiritual é talvez alguma parte do cérebro junto com a Inteligência Universal.
