import { act, renderHook, userEvent } from '../testUtils';

import {
  useKeypressSequenceListener,
  RESET_SEQUENCE_MS,
} from './useKeypressSequenceListener';

jest.useFakeTimers();

test('should call handler and reset sequence', () => {
  const sequence = 'somerandomchars';

  const handler = jest.fn();

  const { result } = renderHook(() =>
    useKeypressSequenceListener([sequence], handler),
  );

  userEvent.keyboard(sequence);

  expect(result.current).toEqual(sequence);

  /**
   *  Does not reset sequence yet.
   */
  act(() => {
    jest.advanceTimersByTime(RESET_SEQUENCE_MS * 0.99);
  });

  expect(result.current).toEqual(sequence);
  expect(handler).toHaveBeenCalledWith(sequence);

  /**
   * Reset sequence.
   */
  act(() => {
    jest.advanceTimersByTime(RESET_SEQUENCE_MS * 2);
  });

  expect(result.current).toEqual('');
});

test('should call handler at every valid sequence', () => {
  const handler = jest.fn();

  const sequence = ['na', 'nb', 'nc'];

  renderHook(() => useKeypressSequenceListener(sequence, handler));

  sequence.forEach((s) => {
    userEvent.keyboard(s);
    expect(handler).toHaveBeenCalledWith(s);
    handler.mockReset();
  });

  userEvent.keyboard('111');
  expect(handler).not.toHaveBeenCalled();
});
