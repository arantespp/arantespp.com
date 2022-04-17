import * as React from 'react';
import { Text, TextProps } from 'theme-ui';

const PedroArantes: React.ForwardRefRenderFunction<any, TextProps> = (
  props,
  ref,
) => {
  return (
    <Text
      ref={ref}
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        fontFamily: 'heading',
        ...props.sx,
      }}
    >
      Pedro Arantes
    </Text>
  );
};

export default React.forwardRef(PedroArantes);
