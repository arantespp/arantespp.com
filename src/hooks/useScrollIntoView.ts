import * as React from 'react';

export const useScrollIntoView = (ref: React.RefObject<HTMLElement>) => {
  React.useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 3000);
    }
  }, [ref]);
};
