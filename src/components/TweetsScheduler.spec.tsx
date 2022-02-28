import { act, render, screen, userEvent } from '../testUtils';

import { TWEET_MAX_CHARS, TweetsScheduler } from './TweetsScheduler';

beforeEach(() => {
  global.localStorage.clear();
});

test('should prepend tweets editors', () => {
  render(<TweetsScheduler />);

  /**
   * https://stackoverflow.com/a/66068989/8786986
   */
  const prependButton = screen.getByRole('button', {
    name: 'prependTweetButton',
  });

  [...Array(11)].forEach((_, i) => {
    userEvent.click(prependButton);

    const tweetText = screen.getByText(`Tweet #${i + 1}`);
    expect(tweetText).toBeInTheDocument();
  });
});

test('should raise character limits message error', async () => {
  render(<TweetsScheduler />);

  const numberOfTweets = 2;

  const prependButton = screen.getByRole('button', {
    name: 'prependTweetButton',
  });

  [...Array(numberOfTweets)].forEach(() => {
    userEvent.click(prependButton);
  });

  const tweetsInputs = screen.getAllByRole('textbox', { name: 'tweetEditor' });

  expect(tweetsInputs).toHaveLength(numberOfTweets);

  const scheduleButton = screen.getByRole('button', { name: 'submitButton' });

  await act(async () => {
    userEvent.click(scheduleButton);
  });

  expect(
    screen.getAllByText('Tweet must be at least 1 characters'),
  ).toHaveLength(numberOfTweets);

  const tweet = 'a'.repeat(TWEET_MAX_CHARS + 1);

  tweetsInputs.forEach((tweetInput) => {
    userEvent.type(tweetInput, tweet);
  });

  await act(async () => {
    userEvent.click(scheduleButton);
  });

  expect(
    screen.getAllByText('Tweet reacher max characters, counting with suffix'),
  ).toHaveLength(numberOfTweets);
});

test('should limit with suffix', async () => {
  render(<TweetsScheduler />);

  const prependButton = screen.getByRole('button', {
    name: 'prependTweetButton',
  });

  act(() => {
    userEvent.click(prependButton);
  });

  const tweetInput = screen.getByRole('textbox', { name: 'tweetEditor' });

  userEvent.type(screen.getByLabelText('Suffix'), 'suffix');
  userEvent.type(tweetInput, 'tweet');

  /**
   * "5" because "tweet" has 5 characters.
   * "272" because discounts the "suffix" length plus "\n\n".
   */
  expect(screen.getByText('5/272')).toBeInTheDocument();

  const scheduleButton = screen.getByRole('button', { name: 'submitButton' });

  userEvent.clear(tweetInput);
  userEvent.type(tweetInput, 'b'.repeat(273));

  await act(async () => {
    tweetInput.blur();
  });

  expect(
    screen.getByText('Tweet reacher max characters, counting with suffix'),
  ).toBeInTheDocument();

  userEvent.clear(tweetInput);
  userEvent.type(tweetInput, 'a'.repeat(272));

  await act(async () => {
    userEvent.click(scheduleButton);
  });

  expect(
    screen.queryByText('Tweet reacher max characters, counting with suffix'),
  ).toBeNull();
});
