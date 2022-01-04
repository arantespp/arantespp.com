import { render, screen } from '../testUtils';

import Tweet from './Tweet';

test('should render tweet', () => {
  const status = '1435945345175932931';

  const { rerender } = render(
    <Tweet href={`https://twitter.com/arantespp/status/${status}`} />,
  );

  expect(screen.getByTestId('embed-tweet')).toBeInTheDocument();

  rerender(<Tweet href={`https://twitter.com/arantespp/status/${status}`} />);

  expect(screen.getByTestId('embed-tweet')).toBeInTheDocument();
});

test.each([
  'https://twitter.com/arantespp/status/',
  'https://twitter.com/arantespp/345879123',
  'http://twitter.com/arantespp/status/345879123',
  'http://twitterrrr.com/arantespp/status/345879123',
])('should not render tweet. Invalid URL %s', (href) => {
  render(<Tweet href={href} />);

  expect(screen.queryByTestId('embed-tweet')).not.toBeInTheDocument();
});
