import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text, TextProps, useThemeUI } from 'theme-ui';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const SHOW_COLOR_MODE = false;

export type HeaderColorModeProps = TextProps;

export const HeaderColorMode = (props: HeaderColorModeProps) => {
  const { colorMode, setColorMode } = useThemeUI();

  React.useEffect(() => {
    setColorMode?.('light');
  }, [setColorMode]);

  if (!SHOW_COLOR_MODE) {
    return null;
  }

  return (
    <Text
      {...props}
      onClick={() => {
        setColorMode?.(colorMode === 'light' ? 'dark' : 'light');
      }}
    >
      <FontAwesomeIcon icon={colorMode === 'light' ? faMoon : faSun} />
    </Text>
  );
};

export default HeaderColorMode;
