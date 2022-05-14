import * as React from 'react';
import { contentEditable } from '../../shortcuts';
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
  useKeypressSequenceListener(contentEditable, toggleEditable);

  React.useEffect(() => {
    if (ref) {
      ref.current?.setAttribute('contentEditable', JSON.stringify(editable));
    }
  }, [editable, ref]);

  return ref;
};
