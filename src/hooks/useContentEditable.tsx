import * as React from 'react';

import { useKeypressSequenceListener } from './useKeypressSequenceListener';

export const useContentEditable = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [editable, setEditable] = React.useState(
    process.env.NODE_ENV === 'development',
  );

  const toggleEditable = React.useCallback(() => {
    setEditable((e) => !e);
  }, []);

  /**
   * Toggle editable when "ce" sequence is pressed.
   */
  useKeypressSequenceListener('ce', toggleEditable);

  React.useEffect(() => {
    if (ref) {
      ref.current?.setAttribute('contentEditable', JSON.stringify(editable));
      setTimeout(() => {
        ref.current?.focus();
      }, 1);
    }
  }, [editable, ref]);

  return ref;
};
