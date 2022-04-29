/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import * as React from 'react';

import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';

import { socialMedias } from '../../lib/socialMedias';

import Layout from '../components/Layout';

import Providers from '../providers/Providers';

import { navigation } from '../../shortcuts';

const title = "Pedro's Blog";

const description =
  "Hello, my name is Pedro. I'm an entrepreneur, engineer, architect, programmer, product developer, writer, sales guy, athlete, and dancer. Welcome to my blog.";

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
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultSeo
        {...{
          title,
          description,
          twitter: {
            cardType: 'summary',
            site: socialMedias.Twitter.username,
            handle: socialMedias.Twitter.username,
          },
          openGraph: {
            url: 'https://arantespp.com',
            type: 'website',
            title,
            description,
          },
        }}
      />
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
};

export default App;
