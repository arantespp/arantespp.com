import * as React from 'react';
import useKeypress from 'react-use-keypress';

export const RESET_SEQUENCE_MS = 4000;

export const WAIT_BEFORE_ACTION_MS = 1000;

export const useKeypressSequenceListener = (
  sequence: string | string[],
  handler: (s: string) => void,
) => {
  const [typedSequence, setTypedSequence] = React.useState('');

  /**
   * Reset sequence.
   */
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setTypedSequence('');
    }, RESET_SEQUENCE_MS);

    return () => clearTimeout(timeout);
  }, [typedSequence]);

  const sequenceArray = React.useMemo(
    () => (Array.isArray(sequence) ? sequence : [sequence]),
    [sequence],
  );

  const chars = Array.from(new Set(sequenceArray.join('')));

  useKeypress(chars, (event) => {
    /**
     * Don't set sequence if input is active.
     */
    if (
      !['input', 'textarea'].includes(
        document.activeElement?.tagName.toLowerCase() || '',
      )
    ) {
      setTypedSequence((s) => s + event.key);
    }
  });

  React.useEffect(() => {
    const validSequence = sequenceArray
      .filter((s) => typedSequence.includes(s))
      .sort(
        (sequenceA, sequenceB) =>
          typedSequence.indexOf(sequenceB) - typedSequence.indexOf(sequenceA),
      );

    const timeout = setTimeout(() => {
      const actionSequence = validSequence[0];
      if (actionSequence) {
        handler(actionSequence);
      }
    }, WAIT_BEFORE_ACTION_MS);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedSequence]);

  return typedSequence;
};
