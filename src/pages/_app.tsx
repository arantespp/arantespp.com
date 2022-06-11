import * as React from 'react';
import { AppProps } from 'next/app';
import { DefaultSeo, DefaultSeoProps } from 'next-seo';
import Head from 'next/head';
import Layout from '../components/Layout';
import Providers from '../providers/Providers';
import dynamic from 'next/dynamic';

const Shortcuts = dynamic(() =>
  import('../components/Shortcuts').then((mod) => mod.Shortcuts),
);

const TagManager = dynamic(() =>
  import('../components/TagManager').then((mod) => mod.TagManager),
);

const title = "Pedro's Blog";

const description =
  "Hello, my name is Pedro. I'm an entrepreneur, engineer, architect, programmer, product developer, writer, sales guy, athlete, and dancer. Welcome to my blog.";

const defaultSeo: DefaultSeoProps = {
  title,
  description,
  twitter: {
    cardType: 'summary',
    site: '@arantespp',
    handle: '@arantespp',
  },
  openGraph: {
    url: 'https://arantespp.com',
    type: 'website',
    title,
    description,
  },
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultSeo {...defaultSeo} />
      <Shortcuts />
      <TagManager />
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  );
};

export default App;
