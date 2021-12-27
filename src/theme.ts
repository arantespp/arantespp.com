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

/**
 * #6f6f6f has high contrast with white.
 */
const lightGray = '#6f6f6f';

const lightLightGray = '#ddd';

const colors = {
  ...palette,
  text: '#2a2a2a',
  gray: '#515151',
  lightGray,
  link: lightGray,
  lightLightGray,
  background: '#fff',
  primary: palette.imperialRed,
  secondary: palette.imperialRed,
  accent: palette.celadonBlue,
  highlight: palette.honeydew,
  muted: '#aaa',
  error: palette.imperialRed,
  twitter: '#1da1f2',
  modes: {
    dark: {
      text: '#eee',
      background: '#1c1c1c',
      link: '#ccc',
      gray: '#ccc',
      /**
       * https://webaim.org/resources/contrastchecker/?fcolor=F39BA2&bcolor=1C1C1C
       */
      primary: '#F39BA2',
    },
  },
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

const katex = {
  '.katex .mord.text': { fontSize: 2, fontFamily: 'body' },
  '.katex-display > .katex': {
    /*
     * Scroll doesn't work because numbered equations.
     */
    whiteSpace: 'normal !important',
    marginY: 4,
  },
  '.katex-display .base': {
    marginBottom: 3,
  },
};

/**
 * https://theme-ui.com/theming/#configuration-flags
 */
const config = {
  initialColorModeName: 'light',
};

const partialTheme = {
  config,
  colors,
  borderWidths: [0, 1, 4],
  fonts: {
    monospace: "'Overpass Mono', monospace",
  },
  fontSizes: [14, 16, 18, 22, 28, 32, 36],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    container: '48em',
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
      button: {
        '&:disabled': {
          backgroundColor: 'muted',
          cursor: 'not-allowed',
        },
      },
      ...katex,
    },
    h1: {
      fontSize: 6,
      marginY: 5,
      wordBreak,
      textAlign: ['center', null, 'left'],
    },
    h2: {
      fontSize: 5,
      marginY: 4,
      wordBreak,
    },
    h3: {
      fontSize: 4,
      marginY: 4,
      wordBreak,
    },
    h4: {
      fontSize: 3,
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
      color: 'link',
      '&:hover': {
        color: 'primary',
        textDecoration: 'none',
      },
    },
    strong: {
      color: 'text',
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
      color: 'white',
      backgroundColor: palette.prussianBlue,
    },
    blockquote: {
      fontStyle: 'italic',
      marginY: 4,
    },
    table: {
      /**
       * https://blog.cykerway.com/posts/2018/07/20/css-trick-centering-an-overflowed-table.html
       */
      overflowX: 'auto',
      display: 'inline-block',
      maxWidth: '100%',
      width: 'auto',
      marginX: 'auto',
      textAlign: 'center',
      strong: {
        color: 'text',
      },
    },
    th: {
      textAlign: 'center',
    },
    td: {
      borderBottomColor: 'muted',
      textAlign: 'center',
    },
  },
  text: {
    highlighted: {
      fontStyle: 'italic',
    },
  },
  buttons: {
    primary: {},
  },
  cards: {
    flashcard: {
      borderRadius: 1,
      width: '100%',
      padding: [3, 4],
      marginY: 1,
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
