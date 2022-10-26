import * as React from 'react';
import { Flex } from 'theme-ui';

const editorWidthInVw = 100;

type FullWidthProps = {
  children: React.ReactNode;
};

const FullWidth = React.forwardRef<HTMLElement, FullWidthProps>(
  (props, ref) => {
    return (
      <Flex
        ref={ref}
        sx={{
          height: '100%',
          width: [`${editorWidthInVw}vw`],
          position: 'relative',
          left: ['50%'],
          right: ['50%'],
          marginX: [`-${editorWidthInVw / 2}vw`],
          justifyContent: 'center',
        }}
      >
        {props.children}
      </Flex>
    );
  },
);

FullWidth.displayName = 'FullWidth';

export default FullWidth;
