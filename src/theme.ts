import { toTheme } from '@theme-ui/typography';
import { merge } from 'theme-ui';
import themeFairyGates from 'typography-theme-fairy-gates';

/**
 * https://kyleamathews.github.io/typography.js/
 */
const typography = toTheme({
  ...themeFairyGates,
  baseFontSize: '18px',
  overrideThemeStyles: () => ({
    h1: {
      wordBreak: 'break-word',
    },
  }),
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

const wordBreak = 'break-word';

const message = {
  fontSize: [2],
  fontStyle: 'italic',
  padding: 0,
  paddingLeft: 3,
  marginY: 2,
  backgroundColor: 'transparent',
  color: 'gray',
  borderColor: 'muted',
};

const partialTheme = {
  borderWidths: [0, 1, 4],
  colors: {
    ...palette,
    text: '#333',
    gray: '#515151',
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
  fontSizes: [13, 16, 18, 24, 32, 48, 64, 96],
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
    excerpt: {
      ...message,
    },
    quote: {
      ...message,
      marginX: 4,
    },
  },
  styles: {
    h1: {
      marginY: 4,
      wordBreak,
    },
    h2: {
      marginY: 4,
      wordBreak,
    },
    h3: {
      marginY: 4,
      wordBreak,
    },
    h4: {
      marginY: 4,
      wordBreak,
    },
    h5: {
      wordBreak,
    },
    h6: {
      wordBreak,
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
    blockquote: {
      fontStyle: 'italic',
      marginY: 4,
    },
  },
  text: {
    highlighted: {
      backgroundColor: 'highlight',
      fontStyle: 'italic',
    },
  },
};

export const theme = merge(typography, partialTheme as any);
