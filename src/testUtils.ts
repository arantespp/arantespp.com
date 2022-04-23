import { enableFetchMocks } from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import Providers from './providers/Providers';

enableFetchMocks();

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Providers, ...options }),
  };
};

export * from '@testing-library/react';

export { customRender as render, renderHook, userEvent };
