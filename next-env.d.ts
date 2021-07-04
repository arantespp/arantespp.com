/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'react-use-keypress' {
  const useKeyPress: (
    keys: string | string[],
    handler: (event: KeyboardEvent) => void,
  ) => void;
  export default useKeyPress;
}
