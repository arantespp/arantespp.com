import * as React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { PresentationCurrentSlideProvider } from './PresentationCurrentSlideProvider';
import { PresentationSlidePage } from '../components/PresentationSlidePage';
import { ThemeProvider } from 'theme-ui';
import { getMDXComponents } from '../components/Markdown';
import { theme } from '../theme';

export const PresentationProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeProvider
      components={{
        ...getMDXComponents({ noH1: false }),
        hr: 'hr',
        SlidePage: PresentationSlidePage,
      }}
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          ...theme.colors?.modes?.dark,
        },
      }}
    >
      <PresentationCurrentSlideProvider>
        <>{children}</>
      </PresentationCurrentSlideProvider>
    </ThemeProvider>
  );
};
