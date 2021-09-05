import { act, render, screen, userEvent } from '../testUtils';

import { useContentEditable } from './useContentEditable';
import { RESET_SEQUENCE_MS } from './useKeypressSequenceListener';

const dataTestId = 'dataTestId';

const Box = () => {
  const ref = useContentEditable();
  return <div data-testid={dataTestId} ref={ref} />;
};

jest.useFakeTimers();

test('toggle content editable and test focus', () => {
  render(<Box />);

  const box = screen.getByTestId(dataTestId);

  /**
   * Initial value is `false` because we aren't in development environment.
   */
  let contentEditable = false;

  [...Array(10)].forEach(() => {
    expect(box).toHaveAttribute(
      'contenteditable',
      JSON.stringify(contentEditable),
    );

    act(() => {
      userEvent.keyboard('ce');
      jest.advanceTimersByTime(RESET_SEQUENCE_MS * 2);
    });

    contentEditable = !contentEditable;
  });

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(document.activeElement).toEqual(box);
});
