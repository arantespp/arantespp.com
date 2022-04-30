import * as React from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

export const GTM_ID = 'GTM-PPHFWMF';

export const pageview = (url) => {
  (window as any)?.dataLayer?.push({
    event: 'pageview',
    page: url,
  });
};

export const TagManager = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

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
