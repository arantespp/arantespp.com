import Head from 'next/head';
import Script from 'next/script';

const HTMLHeaders = ({
  description,
  keywords,
  image,
  noIndex,
  title,
  url,
  updatedAt,
  createdAt,
  structuredData,
}: Partial<{
  description: string;
  keywords: string[];
  image: {
    url: string;
  };
  noIndex: boolean;
  title: string;
  url: string;
  updatedAt?: string;
  createdAt?: string;
  structuredData?: boolean;
}>) => {
  const fullUrl = (partialUrl: string) =>
    partialUrl.startsWith('/')
      ? `https://arantespp.com${partialUrl}`
      : partialUrl;

  const structuredDataJson = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    image: [image?.url],
    datePublished: createdAt,
    dateModified: updatedAt,
    author: [
      {
        '@type': 'Person',
        name: 'Pedro Arantes',
        url: 'https://arantespp.com/contact',
      },
    ],
  };

  return (
    // eslint-disable-next-line @next/next/no-script-component-in-head
    <Head>
      <meta property="og:type" key="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      {keywords && (
        <meta
          key="keywords"
          property="keywords"
          content={keywords.join(', ')}
        />
      )}
      {title && (
        <>
          <title>{title}</title>
          <meta key="og:title" property="og:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta key="description" name="description" content={description} />
          <meta
            key="og:description"
            property="og:description"
            content={description}
          />
        </>
      )}
      {url && <meta key="og:url" property="og:url" content={fullUrl(url)} />}
      {image && (
        <meta
          key="og:image"
          property="og:image"
          content={fullUrl(image?.url)}
        />
      )}
      {noIndex && (
        <>
          <meta key="robots" name="robots" content="noindex,follow" />
          <meta key="googlebot" name="googlebot" content="noindex,follow" />
        </>
      )}
      {structuredData && (
        <Script
          id={title}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataJson),
          }}
        />
      )}
    </Head>
  );
};

export default HTMLHeaders;
