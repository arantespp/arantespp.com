import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import * as colors from '@material-ui/core/colors';
import { Shadows } from '@material-ui/core/styles/shadows';

export const defaultTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      common: { black: '#000', white: '#fff' },
      background: { paper: '#fff', default: '#fff' },
      primary: {
        main: colors.blue[500],
      },
      secondary: {
        main: colors.blueGrey[500],
      },
      text: {
        primary: colors.grey[800],
        secondary: colors.grey[500],
        disabled: colors.grey[300],
        hint: colors.grey[300],
      },
    },
    shadows: Array(25).fill('none') as Shadows,
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            padding: 0,
            margin: 0,
          },
        },
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '4rem',
      },
    },
  })
);
