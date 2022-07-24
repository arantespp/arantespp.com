import {
  RESET_SEQUENCE_MS,
  WAIT_BEFORE_ACTION_MS,
  useKeypressSequenceListener,
} from './useKeypressSequenceListener';
import { act, renderHook, userEvent } from '../testUtils';

test('should call handler and reset sequence', async () => {
  const sequence = 'somerandomchars';

  const handler = jest.fn();

  /**
   * Why delay null? https://testing-library.com/docs/user-event/options#delay
   */
  const user = userEvent.setup({ delay: null });

  const { result } = renderHook(() =>
    useKeypressSequenceListener([sequence], handler),
  );

  await user.keyboard(sequence);

  act(() => {
    jest.advanceTimersByTime(WAIT_BEFORE_ACTION_MS * 2);
  });

  expect(result.current).toEqual(sequence);

  /**
   * Reset sequence.
   */
  act(() => {
    jest.advanceTimersByTime(RESET_SEQUENCE_MS * 2);
  });

  expect(result.current).toEqual('');
});

test('should call handler with the latest sequence value', async () => {
  const handler = jest.fn();

  const sequence = ['na', 'nb', 'nc', 'nd', 'ne'];

  const user = userEvent.setup({ delay: null });

  renderHook(() => useKeypressSequenceListener(sequence, handler));

  await user.keyboard(sequence[0]);
  await user.keyboard(sequence[sequence.length - 1]);

  act(() => {
    jest.advanceTimersByTime(WAIT_BEFORE_ACTION_MS * 2);
  });

  expect(handler).toHaveBeenCalledWith(sequence[sequence.length - 1]);
});

test('should call handler with the latest sequence value with different sizes', async () => {
  const handler = jest.fn();

  const sequence = ['nn', 'ne', 'nne'];

  const user = userEvent.setup({ delay: null });

  renderHook(() => useKeypressSequenceListener(sequence, handler));

  await user.keyboard('nne');

  act(() => {
    jest.advanceTimersByTime(WAIT_BEFORE_ACTION_MS * 2);
  });

  expect(handler).toHaveBeenCalledWith('ne');
});
