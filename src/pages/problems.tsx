import { InferGetStaticPropsType } from 'next';
import { Themed } from 'theme-ui';

import { getProblems } from '../../lib/files';

import HTMLHeaders from '../components/HTMLHeaders';

export const getStaticProps = async () => {
  return { props: { problems: getProblems() } };
};

const Index = ({
  problems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <HTMLHeaders noIndex />
      <Themed.h1>Problems</Themed.h1>
      <Themed.pre>{JSON.stringify(problems, null, 2)}</Themed.pre>
    </>
  );
};

export default Index;
