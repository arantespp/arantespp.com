import * as React from 'react';
import { AppProps } from 'next/app';
import {
  DefaultSeo,
  DefaultSeoProps,
  LogoJsonLd,
  LogoJsonLdProps,
  SocialProfileJsonLd,
  SocialProfileJsonLdProps,
} from 'next-seo';
import { PresentationLayout } from '../components/PresentationLayout';
import { PresentationProviders } from '../providers/PresentationProviders';
import { socialMedias } from '../../lib/socialMedias';
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

const URL = process.env.NEXT_PUBLIC_URL as string;

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
    url: URL,
    type: 'website',
    title,
    description,
    images: [{ url: `${URL}/me.webp` }],
  },
};

const profileJsonLd: SocialProfileJsonLdProps = {
  type: 'Person',
  name: 'Pedro Arantes',
  url: URL,
  sameAs: [
    socialMedias.Twitter.href,
    socialMedias.Instagram.href,
    socialMedias.LinkedIn.href,
  ],
};

const logoJsonLd: LogoJsonLdProps = {
  url: URL,
  logo: `${URL}/images/logo.png`,
};

const App = ({ Component, pageProps, router }: AppProps) => {
  if (router.pathname.startsWith('/presentations/')) {
    return (
      <PresentationProviders>
        <PresentationLayout>
          <Component {...pageProps} />
        </PresentationLayout>
      </PresentationProviders>
    );
  }

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
      <LogoJsonLd {...logoJsonLd} />
      <SocialProfileJsonLd {...profileJsonLd} />
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
