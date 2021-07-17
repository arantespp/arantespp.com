import * as React from 'react';
import useKeypress from 'react-use-keypress';

export const RESET_SEQUENCE_MS = 3000;

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
    if (document.activeElement?.tagName.toLowerCase() !== 'input') {
      setTypedSequence((s) => s + event.key);
    }
  });

  React.useEffect(() => {
    sequenceArray.forEach((s) => {
      if (typedSequence.includes(s)) {
        handler(s);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedSequence]);

  return typedSequence;
};
