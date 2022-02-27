import * as React from 'react';
import { Image, Text, TextProps } from 'theme-ui';

const PedroArantes = ({ ref: textRef, ...props }: TextProps) => (
  <Text
    ref={textRef}
    {...props}
    sx={{
      display: 'flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
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
);

export default PedroArantes;
