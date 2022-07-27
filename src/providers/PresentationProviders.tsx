import * as React from 'react';
import { Image, ThemeProvider } from 'theme-ui';
import { PresentationCurrentSlideProvider } from './PresentationCurrentSlideProvider';
import { PresentationSlidePage } from '../components/PresentationSlidePage';
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
        Image,
        SlidePage: PresentationSlidePage,
      }}
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          ...theme.colors?.modes?.dark,
        },
        styles: {
          ...theme.styles,
          h1: {
            fontSize: 60,
            textAlign: 'center',
            margin: 0,
            marginBottom: 16,
          },
          h2: {
            fontSize: 40,
            textAlign: 'center',
            color: 'primary',
            margin: 0,
            marginBottom: 16,
          },
          p: {
            ...theme.styles?.p,
            fontSize: 28,
          },
        },
      }}
    >
      <PresentationCurrentSlideProvider>
        <>{children}</>
      </PresentationCurrentSlideProvider>
    </ThemeProvider>
  );
};
