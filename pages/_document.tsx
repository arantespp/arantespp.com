import * as React from 'react';

import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          {/* PWA primary color */}
          <meta name="theme-color" content="red" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:url" content="https://arantespp.com" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Pedro Arantes blog" />
          <meta
            property="og:description"
            content="I use this blog as a online note of the subjects I study about."
          />
          <meta property="og:image" content="/me.jpg" />
          <script
            async
            defer
            src="https://www.googletagmanager.com/gtag/js?id=UA-149485554-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());              
                gtag('config', 'UA-149485554-1');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
