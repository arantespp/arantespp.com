import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text, TextProps, useThemeUI } from 'theme-ui';
import { faSun } from '@fortawesome/free-solid-svg-icons';

export type HeaderColorModeProps = TextProps;

const SHOW_COLOR_MODE = false;

export const HeaderColorMode = (props: HeaderColorModeProps) => {
  const { colorMode, setColorMode } = useThemeUI();

  if (!SHOW_COLOR_MODE) {
    return null;
  }

  return (
    <Text
      {...props}
      onClick={() => {
        setColorMode?.(colorMode === 'default' ? 'dark' : 'default');
      }}
    >
      <FontAwesomeIcon icon={faSun} />
    </Text>
  );
};
