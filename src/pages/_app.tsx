/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import * as React from 'react';

import HTMLHeaders from '../components/HTMLHeaders';

import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';

import { socialMedias } from '../../lib/socialMedias';

import Providers from '../providers/Providers';

import { navigation } from '../../shortcuts';

const Layout = dynamic(() => import('../components/Layout'));

const title = 'Pedro Arantes';

const description =
  "Hello, my name is Pedro. I'm an entrepreneur, engineer, architect, programmer, product developer, writer, sales guy, athlete, and dancer. Welcome to my blog.";

/**
 * Twitter meta tags:
 *
 * - https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
 * - https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary
 */
const DefaultHeaders = () => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        key="viewport"
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta key="author" name="author" content="Pedro Arantes" />
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        key="twitter:site"
        name="twitter:site"
        content={socialMedias.Twitter.username}
      />
      <meta
        key="twitter:twitter:creator"
        name="twitter:twitter:creator"
        content={socialMedias.Twitter.username}
      />
      <meta key="og:url" property="og:url" content="https://arantespp.com" />
      <meta key="og:type" property="og:type" content="website" />
      <meta
        key="og:image"
        property="og:image"
        content="https://arantespp.com/me.webp"
      />
      <meta key="description" name="description" content={description} />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
    </Head>
  );
};

const Scripts = () => {
  return (
    <>
      <Script
        async
        defer
        src="https://www.googletagmanager.com/gtag/js?id=UA-149485554-1"
      />
      <Script
        id="gtag"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
                var host = window.location.hostname;
                if(host != "localhost") {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());              
                  gtag('config', 'UA-149485554-1');
                }
              `,
        }}
      />
    </>
  );
};

const useShortcuts = () => {
  const { push } = useRouter();

  const handleListener = React.useCallback(
    (key: string) => {
      push(navigation[key]);
    },
    [push],
  );

  useKeypressSequenceListener(Object.keys(navigation), handleListener);
};

const App = ({ Component, pageProps }: AppProps) => {
  useShortcuts();

  return (
    <>
      <Scripts />
      <Providers>
        <DefaultHeaders />
        <HTMLHeaders title={title} description={description} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
};

export default App;
