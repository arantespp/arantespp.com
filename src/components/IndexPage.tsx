import { pascalCase } from 'change-case';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Box } from 'theme-ui';

import { Recommendation, Group } from '../lib/files';

import KeywordsHead from './KeywordsHead';

const Markdown = dynamic(() => import('./Markdown'));
const Recommendations = dynamic(() => import('./Recommendations'));

const IndexPage = ({
  content,
  group,
  recommendations,
  excerpt,
  image,
}: {
  content: string;
  group?: Group;
  recommendations: Recommendation[];
  image?: { url: string };
  excerpt?: string;
}) => {
  const keywords = [
    group || '',
    ...recommendations.flatMap(({ tags }) => tags),
  ];
  return (
    <>
      <Head>
        {group && (
          <>
            <title>{pascalCase(group)}</title>
            <meta
              key="og:title"
              property="og:title"
              content={pascalCase(group)}
            />
            <meta
              key="og:url"
              property="og:url"
              content={`https://arantespp.com/${group}`}
            />
          </>
        )}
        {excerpt && (
          <>
            <meta key="description" name="description" content={excerpt} />
            <meta
              key="og:description"
              property="og:description"
              content={excerpt}
            />
          </>
        )}
        {image && (
          <meta key="og:image" property="og:image" content={image?.url} />
        )}
        <meta
          key="keywords"
          property="keywords"
          content={keywords.join(', ')}
        />
      </Head>
      <KeywordsHead keywords={keywords} />
      {content && (
        <Box sx={{ marginBottom: 5 }}>
          <Markdown content={content} noH1={false} />
        </Box>
      )}
      <Recommendations recommendations={recommendations} />
    </>
  );
};

export default IndexPage;
