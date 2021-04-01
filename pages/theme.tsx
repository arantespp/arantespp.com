import { Themed } from 'theme-ui';

import { theme } from '../theme';

const Theme = () => {
  return (
    <>
      <Themed.h1>Theme</Themed.h1>
      <Themed.pre>{JSON.stringify(theme, null, 2)}</Themed.pre>
    </>
  );
};

export default Theme;
