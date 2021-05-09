import * as React from 'react';
import { Image, Text, TextProps } from 'theme-ui';

const PedroArantes = React.forwardRef(
  ({ ref: textRef, ...props }: TextProps, ref) => (
    <Text
      ref={ref as any}
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        '&:hover': {
          color: 'primary',
        },
        ...props.sx,
      }}
    >
      Pedro Arantes
      {/**
       * Use Image instead emoji because not every browser render the
       * rose in the same way.
       * */}
      <Image sx={{ height: '1em', marginLeft: 1 }} src="/rose.png" alt="rose" />
    </Text>
  ),
);

export default PedroArantes;
