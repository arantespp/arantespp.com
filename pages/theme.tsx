import { Styled } from 'theme-ui';

import { theme } from '../theme';

const Theme = () => {
  return (
    <>
      <Styled.h1>Theme</Styled.h1>
      <Styled.pre>{JSON.stringify(theme, null, 2)}</Styled.pre>
    </>
  );
};

export default Theme;
