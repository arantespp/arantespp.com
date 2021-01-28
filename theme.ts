import { toTheme } from '@theme-ui/typography';
import { merge } from 'theme-ui';
import themeFairyGates from 'typography-theme-fairy-gates';

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

const partialTheme: any = {
  borderWidths: [0, 1, 4],
  colors: {
    ...palette,
    text: '#333',
    gray: '#555',
    background: '#fff',
    primary: palette.prussianBlue,
    secondary: palette.celadonBlue,
    accent: palette.imperialRed,
    highlight: palette.honeydew,
    muted: '#aaa',
  },
  fonts: {
    monospace: "'Overpass Mono', monospace",
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    container: '44em',
  },
  links: {
    tag: {
      color: 'secondary',
      fontFamily: 'heading',
      fontSize: 1,
      textDecoration: 'none',
    },
  },
  messages: {
    quote: {
      fontSize: [2],
      fontStyle: 'italic',
      padding: 2,
      paddingLeft: 3,
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
      color: 'primary',
    },
    ol: {
      ml: 4,
    },
    ul: {
      ml: 4,
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      overflowX: 'auto',
      backgroundColor: 'primary',
      color: 'white',
    },
  },
  text: {
    highlighted: {
      backgroundColor: 'highlight',
      fontStyle: 'italic',
    },
  },
};

export const theme = merge(typography, partialTheme);
