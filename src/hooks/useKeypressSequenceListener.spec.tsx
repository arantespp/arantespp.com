import { act, renderHook, userEvent } from '../testUtils';

import {
  useKeypressSequenceListener,
  RESET_SEQUENCE_MS,
  WAIT_BEFORE_ACTION_MS,
} from './useKeypressSequenceListener';

jest.useFakeTimers();

test('should call handler and reset sequence', () => {
  const sequence = 'somerandomchars';

  const handler = jest.fn();

  const { result } = renderHook(() =>
    useKeypressSequenceListener([sequence], handler),
  );

  userEvent.keyboard(sequence);

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

test('should call handler with the latest sequence value', () => {
  const handler = jest.fn();

  const sequence = ['na', 'nb', 'nc', 'nd', 'ne'];

  renderHook(() => useKeypressSequenceListener(sequence, handler));

  sequence.forEach((s) => {
    userEvent.keyboard(s);
  });

  act(() => {
    jest.advanceTimersByTime(WAIT_BEFORE_ACTION_MS * 2);
  });

  expect(handler).toHaveBeenCalledWith(sequence[sequence.length - 1]);
});

test('should call handler with the latest sequence value with different sizes', () => {
  const handler = jest.fn();

  const sequence = ['nn', 'ne', 'nne'];

  renderHook(() => useKeypressSequenceListener(sequence, handler));

  userEvent.keyboard('nne');

  act(() => {
    jest.advanceTimersByTime(WAIT_BEFORE_ACTION_MS * 2);
  });

  expect(handler).toHaveBeenCalledWith('ne');
});
