import * as React from 'react';

const Rose = (props: any) => <img {...props} src="/rose.png" />;

export default React.memo(Rose);
