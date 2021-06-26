import * as faker from 'faker';

import { render, screen } from '../testUtils';

import Tweet from './Tweet';

const tweets = [
  '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">It&#39;s not that easy. <br><br>I started using Twitter three days ago and wasn&#39;t easy to write my first tweet.</p>&mdash; Pedro Arantes 🌹 (@arantespp) <a href="https://twitter.com/arantespp/status/1197522233801027584?ref_src=twsrc%5Etfw">November 21, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
  '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">As a leader, how can you<br>- Make a major, singular impact<br>- Truly empower team members<br>- Grow them with “stretch tasks”<br>- Create flow for self &amp; others<br>- Avoid burnout<br><br>Answer: Radical Delegation<br><br>(note: not for everyone, but game-changing for leaders &amp; teams who are ready for it) <a href="https://t.co/C0F1ULOo2N">pic.twitter.com/C0F1ULOo2N</a></p>&mdash; Shreyas Doshi (@shreyas) <a href="https://twitter.com/shreyas/status/1401598910792011776?ref_src=twsrc%5Etfw">June 6, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>',
];

const eachTweets = tweets.flatMap((tweet) => [
  [`![tweet](${tweet})`],
  [`![twitter](${tweet})`],
]);

const notWorkingTweets = [
  ['[tweet](<blockquote class="twitter-tweet" />)'],
  ['![twee](<blockquote class="twitter-tweet" />)'],
  ['![tweet]<blockquote class="twitter-tweet" />'],
  ['[twitter](<blockquote class="twitter-tweet" />)'],
  ['![twitte](<blockquote class="twitter-tweet" />)'],
  ['![twitter]<blockquote class="twitter-tweet" />'],
];

describe('testing isTweet method', () => {
  test.each(eachTweets)('working tweets: %s', (tweet) => {
    expect(Tweet.isTweet(tweet.split('>'))).toBeTruthy();
  });

  test.each(notWorkingTweets)('not working tweets: %s', (tweet) => {
    expect(Tweet.isTweet(tweet.split('>'))).toBeFalsy();
  });
});

describe('testing Tweet component', () => {
  test.each(eachTweets)('should render tweet: %s', (tweet) => {
    render(<Tweet>{`![tweet](${tweet})`.split('<')}</Tweet>);
    expect(screen.getByTestId('embed-tweet')).toBeInTheDocument();
  });

  test.each(notWorkingTweets)('should not render tweet: %s', (tweet) => {
    render(<Tweet>{tweet.split('<')}</Tweet>);
    expect(screen.queryByTestId('embed-tweet')).not.toBeInTheDocument();
  });

  test.each([...new Array(10)].map(() => [faker.random.words(10)]))(
    'should have specific text: %s',
    (text) => {
      render(<Tweet>{`![tweet](${text})`.split('<')}</Tweet>);
      expect(text).toBeTruthy();
      expect(screen.getByText(text)).toBeInTheDocument();
    },
  );
});
