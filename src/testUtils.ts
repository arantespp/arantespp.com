import { RenderOptions, render } from '@testing-library/react';
import { enableFetchMocks } from 'jest-fetch-mock';
import { renderHook } from '@testing-library/react-hooks';
import Providers from './providers/Providers';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

enableFetchMocks();

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Providers, ...options }),
  };
};

export * from '@testing-library/react';

export { customRender as render, renderHook, userEvent };
