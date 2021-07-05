import { act, render, screen, userEvent } from '../testUtils';

import { useContentEditable } from './useContentEditable';

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
   * Initial value is `true` because we aren't in production environment.
   */
  let contentEditable = true;

  [...Array(10)].forEach(() => {
    expect(box).toHaveAttribute(
      'contenteditable',
      JSON.stringify(contentEditable),
    );

    act(() => {
      userEvent.keyboard('te');
    });

    contentEditable = !contentEditable;
  });

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(document.activeElement).toEqual(box);
});
