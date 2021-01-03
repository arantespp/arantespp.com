import { toTheme } from '@theme-ui/typography';
import { merge } from 'theme-ui';
import themeFairyGates from 'typography-theme-fairy-gates';

export const getTheme = () => {
  /**
   * https://kyleamathews.github.io/typography.js/
   */
  const typography = toTheme({
    ...themeFairyGates,
    baseFontSize: '18px',
  });

  /**
   * https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557
   */
  const palette = {
    imperialRed: '#e63946',
    honeydew: '#f1faee',
    powderBlue: '#a8dadc',
    celadonBlue: '#457b9d',
    prussianBlue: '#1d3557',
  };

  const theme: any = {
    borderWidths: [0, 2, 6],
    colors: {
      text: 'hsla(0, 0%, 0%, 1)',
      gray: 'hsla(0, 0%, 0%, 0.8)',
      background: '#fff',
      primary: palette.prussianBlue,
      secondary: palette.celadonBlue,
      accent: palette.imperialRed,
      highlight: palette.honeydew,
      muted: '#f6f6f6',
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: {
      container: '48em',
    },
    links: {
      tag: {
        color: 'secondary',
        fontFamily: 'heading',
        fontSize: 1,
        paddingRight: 3,
      },
    },
    messages: {
      quote: {
        fontSize: [2],
        fontStyle: 'italic',
        padding: 2,
      },
    },
    styles: {
      h1: {
        marginY: 4,
      },
      h2: {
        marginY: 4,
      },
      h3: {
        marginY: 4,
      },
      a: {
        color: 'secondary',
      },
      strong: {
        color: 'accent',
      },
      ol: {
        ml: 4,
      },
      ul: {
        ml: 4,
      },
    },
  };

  return merge(typography, theme);
};
