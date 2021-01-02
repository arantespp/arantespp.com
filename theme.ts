import { toTheme } from '@theme-ui/typography';
import { merge } from 'theme-ui';
import themeFairyGates from 'typography-theme-fairy-gates';

export const getTheme = () => {
  /**
   * https://kyleamathews.github.io/typography.js/
   */
  const typography = toTheme({
    ...themeFairyGates,
  });

  const theme: any = {
    borderWidths: [0, 3, 6],
    colors: {
      text: 'hsla(0,0%,0%,0.8)',
      background: '#fff',
      primary: '#ca0000',
      muted: '#f6f6f6',
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: {
      container: '42em',
    },
  };

  return merge(typography, theme);
};
