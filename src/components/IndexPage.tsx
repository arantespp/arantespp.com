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
}: {
  content: string;
  group?: Group;
  recommendations: Recommendation[];
}) => {
  const keywords = [
    group || '',
    ...recommendations.flatMap(({ tags }) => tags),
  ];
  return (
    <>
      <Head>{group && <title>{pascalCase(group)}</title>}</Head>
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
