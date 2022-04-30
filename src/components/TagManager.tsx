import * as React from 'react';
import GtmModule from 'react-gtm-module';

export const TagManager = () => {
  /**
   * https://www.learnbestcoding.com/post/9/easiest-way-to-integrate-google-analytics-with-react-js-and-next-js
   */
  React.useEffect(() => {
    GtmModule.initialize({ gtmId: 'GTM-PPHFWMF' });
  }, []);

  return null;
};
