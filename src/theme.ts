import { toTheme } from '@theme-ui/typography';
import { merge } from 'theme-ui';
import themeFairyGates from 'typography-theme-fairy-gates';

/**
 * https://kyleamathews.github.io/typography.js/
 */
const typography = toTheme({
  ...themeFairyGates,
  baseFontSize: '18px',
  /**
   * Golden Ratio.
   * https://en.wikipedia.org/wiki/Golden_ratio
   */
  baseLineHeight: 1.618033,
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

const colors = {
  ...palette,
  text: '#2a2a2a',
  gray: '#515151',
  /**
   * #6f6f6f has high contrast with white.
   */
  lightGray: '#6f6f6f',
  background: '#fff',
  primary: palette.imperialRed,
  secondary: palette.imperialRed,
  accent: palette.celadonBlue,
  highlight: palette.honeydew,
  muted: '#aaa',
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
  colors,
  fonts: {
    monospace: "'Overpass Mono', monospace",
  },
  fontSizes: [13, 16, 18, 24, 32, 48, 64, 96],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    container: '44em',
  },
  radii: [0, '4px'],
  shadows: ['none', `10px 10px 10px -10px #aaa`],
  links: {
    tag: {
      color: 'primary',
      fontFamily: 'heading',
      fontSize: 1,
      textDecoration: 'none',
      '&:hover': {
        color: 'text',
      },
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
    root: {
      '*': {
        '&::selection': {
          background: '#ddd',
        },
      },
    },
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
      fontSize: 2,
      marginY: 4,
      fontWeight: 'normal',
      wordBreak,
    },
    h6: {
      fontSize: 2,
      fontWeight: 'normal',
      fontStyle: 'italic',
      wordBreak,
    },
    a: {
      color: 'lightGray',
      '&:hover': {
        color: 'primary',
      },
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
      backgroundColor: 'prussianBlue',
      color: 'white',
    },
    blockquote: {
      fontStyle: 'italic',
      marginY: 4,
    },
  },
  text: {
    highlighted: {
      fontStyle: 'italic',
    },
  },
  buttons: {
    primary: {
      cursor: 'pointer',
    },
  },
  cards: {
    flashcard: {
      borderRadius: 1,
      width: '100%',
      padding: [3, 4],
      marginY: 3,
      alignItems: 'center',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'muted',
      boxShadow: 1,
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const theme = merge(typography, partialTheme as any);
