import { Themed, useThemeUI } from 'theme-ui';

const Theme = () => {
  const { theme } = useThemeUI();

  return (
    <>
      <Themed.h1>Theme</Themed.h1>
      <Themed.pre>{JSON.stringify(theme, null, 2)}</Themed.pre>
    </>
  );
};

export default Theme;
