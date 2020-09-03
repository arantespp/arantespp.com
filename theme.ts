import { toTheme } from '@theme-ui/typography';
import { merge } from 'theme-ui';
import themeFairyGates from 'typography-theme-fairy-gates';

/**
 * https://kyleamathews.github.io/typography.js/
 */
const typography = toTheme({
  ...themeFairyGates,
  baseFontSize: '20px',
  baseLineHeight: 1.6,
  scaleRatio: 2,
});

const theme: any = {
  borders: ['3px solid'],
  colors: {
    text: 'hsla(0,0%,0%,0.8)',
    background: '#fff',
    primary: '#ca0000',
    muted: '#f6f6f6',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  styles: {
    h1: {
      textAlign: 'center',
    },
  },
};

export default merge(typography, theme);
