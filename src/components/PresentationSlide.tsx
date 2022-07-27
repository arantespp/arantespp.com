import * as React from 'react';
import { Flex } from 'theme-ui';

export const PresentationSlide = ({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) => {
  return (
    <Flex
      id={id}
      className={className}
      sx={{
        paddingY: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {children}
    </Flex>
  );
};
