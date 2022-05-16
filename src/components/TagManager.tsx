import * as React from 'react';
import Script from 'next/script';

const env = process.env.NODE_ENV;

export const GTM_ID = 'GTM-PPHFWMF';

export const TagManager = () => {
  const [loadTagManager, setLoadTagManager] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadTagManager(true);
    }, 5 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  });

  if (env !== 'production') {
    return null;
  }

  if (!loadTagManager) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/inline-script-id
    <Script
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', '${GTM_ID}');
    `,
      }}
    />
  );
};
