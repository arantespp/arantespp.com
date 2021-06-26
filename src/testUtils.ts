import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';

import Providers from './providers/Providers';

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
