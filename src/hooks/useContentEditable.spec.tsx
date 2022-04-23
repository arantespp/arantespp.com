import { act, render, screen, userEvent } from '../testUtils';

import { useContentEditable } from './useContentEditable';
import { RESET_SEQUENCE_MS } from './useKeypressSequenceListener';

const dataTestId = 'dataTestId';

const Box = () => {
  const ref = useContentEditable();
  return <div data-testid={dataTestId} ref={ref} />;
};

test('toggle content editable and test focus', async () => {
  const user = userEvent.setup({ delay: null });

  render(<Box />);

  const box = screen.getByTestId(dataTestId);

  expect(box).toHaveAttribute('contenteditable', JSON.stringify(false));

  await user.keyboard('ce');

  act(() => {
    jest.advanceTimersByTime(RESET_SEQUENCE_MS * 2);
  });

  expect(box).toHaveAttribute('contenteditable', JSON.stringify(true));

  await user.keyboard('ce');

  act(() => {
    jest.advanceTimersByTime(RESET_SEQUENCE_MS * 2);
  });

  expect(box).toHaveAttribute('contenteditable', JSON.stringify(false));

  await user.keyboard('ce');

  act(() => {
    jest.advanceTimersByTime(RESET_SEQUENCE_MS * 2);
  });

  expect(box).toHaveAttribute('contenteditable', JSON.stringify(true));

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  expect(document.activeElement).toEqual(box);
});
