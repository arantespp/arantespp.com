import * as React from 'react';
import { useRouter } from 'next/router';

export const ApiKeyContext = React.createContext<{
  apiKey: string;
  setApiKey: (apiKey: string) => undefined | void;
}>({
  apiKey: '',
  setApiKey: () => undefined,
});

const LOCAL_STORAGE_KEY = 'arantespp-api-key';

export const ApiKeyProvider = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();

  const [apiKey, setApiKeyState] = React.useState('');

  React.useEffect(() => {
    const ak = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (ak) {
      setApiKeyState(ak);
    }
  }, [push]);

  const setApiKey = React.useCallback((ak: string) => {
    setApiKeyState(ak);
    localStorage.setItem(LOCAL_STORAGE_KEY, ak);
  }, []);

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};
