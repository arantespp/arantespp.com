import Head from 'next/head';

const HTMLHeaders = ({
  description,
  keywords,
  image,
  noIndex,
  title,
  url,
}: Partial<{
  description: string;
  keywords: string[];
  image: {
    url: string;
  };
  noIndex: boolean;
  title: string;
  url: string;
}>) => {
  const fullUrl = (partialUrl: string) =>
    partialUrl.startsWith('/')
      ? `https://arantespp.com${partialUrl}`
      : partialUrl;

  return (
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
    </Head>
  );
};

export default HTMLHeaders;
