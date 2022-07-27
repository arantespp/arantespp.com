import * as React from 'react';
import { Container } from 'theme-ui';

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
    <Container
      id={id}
      className={className}
      sx={{
        paddingY: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Container>
  );
};
