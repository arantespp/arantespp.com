import * as faker from 'faker';

import { act, render, screen } from '../testUtils';

import Journal from './Journal';

jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => null;
  DynamicComponent.displayName = 'LoadableComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

jest.useFakeTimers();

const title = faker.random.words();

test('should render title and loading', () => {
  render(<Journal title={title} />);

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByText(title)).toBeInTheDocument();
  expect(screen.getByRole('status')).toBeInTheDocument();
});

/**
 * Skipped because dynamic import issue.
 */
test.skip('should render title and markdown', () => {
  const h1 = faker.random.words();
  const h2 = faker.random.words();
  const text = faker.random.words();

  const markdown = `
    # ${h1}
    ## ${h2}
    ${text}
  `;

  render(<Journal title={title} markdown={markdown} />);

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByText('title')).toBeInTheDocument();
  expect(screen.getByRole('status')).not.toBeInTheDocument();
});
