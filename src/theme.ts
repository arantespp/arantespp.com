import { Theme } from 'theme-ui';
import breakpoints from '../breakpoints';

/**
 * https://www.canva.com/colors/color-wheel/
 */
const palette = {
  twitterBlue: '#1da1f2',
  /**
   * Red
   */
  primary: '#B60000',
  lightPrimary: '#FFD0D0',
  complementary: '#00B6B6',
  analogous1: '#B65B00',
  analogous2: '#B6005B',
};

/**
 * #6f6f6f has high contrast with white.
 */
const lightGray = '#6f6f6f';

const lightLightGray = '#ddd';

const light = {
  text: '#2a2a2a',
  background: '#fdfdfd',
  primary: palette.primary,
  secondary: palette.complementary,
  accent: palette.analogous1,
  highlight: palette.lightPrimary,
  error: palette.primary,
  link: lightGray,
  gray: '#515151',
};

type BlogColorMode = typeof light;

const dark: BlogColorMode = {
  text: '#ddd',
  background: '#212121',
  primary: '#ED975E',
  secondary: '#5EB4ED',
  accent: '#ED5E6D',
  highlight: '#EDDF5E',
  error: '#ED5E6D',
  link: '#ccc',
  gray: '#ccc',
};

const colors = {
  modes: { dark },
  ...palette,
  lightGray,
  lightLightGray,
  muted: '#aaa',
  twitter: palette.twitterBlue,
  ...light,
};

/**
 * https://theme-ui.com/theming/#configuration-flags
 */
const config = {
  initialColorModeName: 'light',
};

export const theme: Theme = {
  config,
  colors,
  breakpoints: breakpoints.map((b) => b + 'em'),
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '"Open Sans", sans-serif',
    heading: 'sans-serif',
    monospace: 'monospace',
  },
  fontSizes: [14, 16, 18, 20, 24, 28, 32],
  fontWeights: {
    body: 400,
    bold: 700,
    heading: 600,
  },
  lineHeights: {
    body: 1.75,
    heading: 1.25,
  },
  borderWidths: [0, 1, 4],
  sizes: {
    container: '48em',
  },
  radii: [0, '4px'],
  shadows: ['none', '10px 10px 10px -10px #aaa'],
  styles: {
    root: {
      overflowX: 'hidden',
      fontSize: '16px',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      button: {
        cursor: 'pointer',
        '&:disabled': {
          backgroundColor: 'muted',
          cursor: 'not-allowed',
        },
      },
      '.katex .mord.text': {
        fontSize: [0, 2],
        fontFamily: 'body',
      },
      '.katex-display > .katex': {
        // whiteSpace: 'normal !important',
        whiteSpace: 'normal',
        marginY: 4,
      },
      '.katex-display .base': {
        marginBottom: 3,
      },
    },
    img: {
      padding: 0,
      margin: 0,
      marginBottom: 3,
      maxWidth: '100%',
    },
    h1: {
      padding: 0,
      margin: 0,
      fontSize: [4, 5],
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      marginY: 4,
      wordBreak: 'break-word',
      textAlign: ['left'],
    },
    h2: {
      padding: 0,
      margin: 0,
      marginTop: 5,
      marginBottom: 4,
      fontSize: [3, 4],
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      wordBreak: 'break-word',
    },
    h3: {
      padding: 0,
      margin: 0,
      marginTop: 5,
      marginBottom: 4,
      fontSize: [3, 3],
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      wordBreak: 'break-word',
    },
    h4: {
      padding: 0,
      margin: 0,
      marginTop: 5,
      marginBottom: 3,
      fontSize: 2,
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      wordBreak: 'break-word',
    },
    h5: {
      padding: 0,
      margin: 0,
      marginTop: 4,
      marginBottom: 3,
      fontSize: 2,
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'normal',
      wordBreak: 'break-word',
    },
    h6: {
      padding: 0,
      margin: 0,
      marginBottom: 3,
      fontSize: 2,
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'normal',
      fontStyle: 'italic',
      wordBreak: 'break-word',
    },
    ul: {
      padding: 0,
      margin: 0,
      marginBottom: 3,
      listStylePosition: 'outside',
      listStyleImage: 'none',
      ml: 4,
    },
    ol: {
      padding: 0,
      margin: 0,
      marginBottom: 3,
      listStylePosition: 'outside',
      listStyleImage: 'none',
      ml: 4,
    },
    li: {
      mb: 2,
      pl: 0,
      ol: {
        my: 2,
        ml: 3,
      },
      ul: {
        my: 2,
        ml: 3,
      },
      p: {
        mb: 2,
      },
    },
    p: {
      padding: 0,
      margin: 0,
      marginBottom: 3,
    },
    table: {
      padding: 0,
      margin: 0,
      marginBottom: 3,
      borderCollapse: 'collapse',
      /**
       * https://blog.cykerway.com/posts/2018/07/20/css-trick-centering-an-overflowed-table.html
       */
      width: 'auto',
      overflowX: 'auto',
      display: 'inline-block',
      maxWidth: '100%',
      marginX: 'auto',
      textAlign: 'center',
      strong: {
        color: 'text',
      },
    },
    th: {
      textAlign: 'center',
      borderBottom: '1px solid',
      px: 2,
      py: 1,
      ':first-child': {
        pl: 0,
      },
      ':last-child': {
        pr: 0,
      },
    },
    td: {
      textAlign: 'center',
      borderBottom: '1px solid',
      px: 2,
      py: 1,
      mt: '-1px',
      ':first-child': {
        pl: 0,
      },
      ':last-child': {
        pr: 0,
      },
      borderBottomColor: 'muted',
    },
    blockquote: {
      padding: 0,
      margin: 0,
      marginBottom: 3,
      mx: 3,
      fontStyle: 'italic',
      marginY: 4,
    },
    hr: {
      padding: 0,
      margin: 0,
      marginBottom: 3,
      border: 0,
      borderBottom: '1px solid',
      mt: '-1px',
      mb: 3,
      color: 'muted',
      width: '20%',
      marginX: 'auto',
      marginY: 4,
    },
    b: {
      fontWeight: 'bold',
    },
    strong: {
      fontWeight: 'bold',
      color: 'text',
    },
    code: {
      fontSize: '85%',
    },
    pre: {
      padding: 3,
      margin: 0,
      marginBottom: 3,
      fontSize: 1,
      fontFamily: 'monospace',
      overflowX: 'auto',
      color: 'text',
      backgroundColor: 'lightLightGray',
    },
    a: {
      color: 'link',
      '&:hover': {
        color: 'primary',
        textDecoration: 'none',
      },
    },
  },
  links: {
    tag: {
      color: 'primary',
      fontFamily: 'body',
      fontSize: [0, 1],
      textDecoration: 'none',
      '&:hover': {
        color: 'text',
      },
    },
  },
  messages: {
    excerpt: {
      fontSize: [1, 2],
      fontStyle: 'italic',
      padding: 0,
      paddingLeft: 3,
      paddingRight: 0,
      marginY: [2],
      backgroundColor: 'transparent',
    },
    quote: {
      fontSize: [1],
      fontStyle: 'italic',
      padding: 0,
      marginY: 4,
      paddingLeft: [1, 2],
      backgroundColor: 'transparent',
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
  forms: {
    checkbox: {},
    input: {
      fontFamily: 'inherit',
      backgroundColor: 'background',
      fontSize: [0, 1],
    },
    textarea: {
      fontFamily: 'inherit',
      backgroundColor: 'background',
      fontSize: [0, 1],
    },
  },
};
