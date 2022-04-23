import { act, render, screen, userEvent } from '../testUtils';

import { TWEET_MAX_CHARS } from './TweetEditor';
import { TweetsScheduler } from './TweetsScheduler';

jest.setTimeout(60 * 1000);

beforeEach(() => {
  global.localStorage.clear();
});

test('should prepend tweets editors', async () => {
  const user = userEvent.setup({ delay: null });

  render(<TweetsScheduler />);

  /**
   * https://stackoverflow.com/a/66068989/8786986
   */
  const prependButton = screen.getByRole('button', {
    name: 'prependTweetButton',
  });

  [...Array(11)].forEach(async (_, i) => {
    await user.click(prependButton);

    const tweetText = screen.getByText(`Tweet #${i + 1}`);
    expect(tweetText).toBeInTheDocument();
  });
});

test('should raise character limits message error', async () => {
  const user = userEvent.setup({ delay: null });

  render(<TweetsScheduler />);

  const numberOfTweets = 2;

  const prependButton = screen.getByRole('button', {
    name: 'prependTweetButton',
  });

  await Promise.all(
    [...Array(numberOfTweets)].map(() => user.click(prependButton)),
  );

  const tweetsInputs = screen.getAllByRole('textbox', { name: 'tweetEditor' });

  expect(tweetsInputs).toHaveLength(numberOfTweets);

  const scheduleButton = screen.getByRole('button', { name: 'submitButton' });

  await act(async () => {
    await user.click(scheduleButton);
  });

  expect(
    screen.getAllByText('Tweet must be at least 1 characters'),
  ).toHaveLength(numberOfTweets);

  const tweet = 'a'.repeat(TWEET_MAX_CHARS + 1);

  await Promise.all(
    tweetsInputs.map((tweetInput) => user.type(tweetInput, tweet)),
  );

  await act(async () => {
    await user.click(scheduleButton);
  });

  expect(
    screen.getAllByText('Tweet reacher max characters, counting with suffix')
      .length,
  ).toBeGreaterThan(0);
});

test('should limit with suffix', async () => {
  const user = userEvent.setup({ delay: null });

  render(<TweetsScheduler />);

  const prependButton = screen.getByRole('button', {
    name: 'prependTweetButton',
  });

  await act(async () => {
    await user.click(prependButton);
  });

  const tweetInput = screen.getByRole('textbox', { name: 'tweetEditor' });

  await user.type(screen.getByLabelText('Suffix'), 'suffix');
  await user.type(tweetInput, 'tweet');

  /**
   * "5" because "tweet" has 5 characters.
   * "272" because discounts the "suffix" length plus "\n\n".
   */
  expect(screen.getByText('5/272')).toBeInTheDocument();

  const scheduleButton = screen.getByRole('button', { name: 'submitButton' });

  await user.clear(tweetInput);
  await user.type(tweetInput, 'a'.repeat(273));

  await act(async () => {
    tweetInput.blur();
  });

  expect(
    screen.getByText('Tweet reacher max characters, counting with suffix'),
  ).toBeInTheDocument();

  await user.clear(tweetInput);
  await user.type(tweetInput, 'a'.repeat(272));

  await act(async () => {
    await user.click(scheduleButton);
  });

  expect(
    screen.queryByText('Tweet reacher max characters, counting with suffix'),
  ).toBeNull();
});
