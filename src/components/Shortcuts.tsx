import * as React from 'react';
import { BrowserView } from 'react-device-detect';
import { navigation } from '../../shortcuts';
import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';
import { useRouter } from 'next/router';

const useShortcuts = () => {
  const { push } = useRouter();

  const handleListener = React.useCallback(
    (key: string) => {
      push(navigation[key]);
    },
    [push],
  );

  useKeypressSequenceListener(Object.keys(navigation), handleListener);
};

const LoadShortcuts = () => {
  useShortcuts();
  return null;
};

export const Shortcuts = () => {
  return (
    <BrowserView>
      <LoadShortcuts />
    </BrowserView>
  );
};
