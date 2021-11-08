import * as dateFns from 'date-fns';
import * as fs from 'fs';
import * as path from 'path';

jest.setTimeout(30000);

const dateStartJournal = new Date(2021, 5, 8);

const doesJournalExist = async ({
  year,
  month,
  day,
}: {
  year: string;
  month: string;
  day: string;
}) => {
  try {
    const journal = await fs.promises.readFile(
      path.join(process.cwd(), `./posts/journal/${year}/${month}/${day}.md`),
      'utf8',
    );

    return !!journal;
  } catch {
    return false;
  }
};

const hasJournalsAGap = async () => {
  let currentDate = dateStartJournal;
  let hasGap = false;
  let journalThatDoesNotExist = '';
  const journalsThatDoesNotExist = [];

  while (currentDate <= new Date()) {
    const [year, month, day] = dateFns
      .format(currentDate, 'yyyy MM dd')
      .split(' ');

    // eslint-disable-next-line no-await-in-loop
    const journalExist = await doesJournalExist({ year, month, day });

    if (!journalExist) {
      journalsThatDoesNotExist.push(`${year}-${month}-${day}`);
    }

    if (!journalExist && !journalThatDoesNotExist) {
      journalThatDoesNotExist = `${year}-${month}-${day}`;
    }

    if (journalThatDoesNotExist && journalExist) {
      hasGap = true;
    }

    currentDate = dateFns.addDays(currentDate, 1);
  }

  if (journalsThatDoesNotExist.length > 2) {
    throw new Error(
      `Journals that dont exist: ${JSON.stringify(journalsThatDoesNotExist)}`,
    );
  }

  return hasGap ? journalThatDoesNotExist : false;
};

test('should not have a gap on journals', async () => {
  const hasGap = await hasJournalsAGap();
  expect(hasGap).toBe(false);
});
