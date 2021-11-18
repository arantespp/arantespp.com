import { InferGetStaticPropsType } from 'next';
import { Themed } from 'theme-ui';

import { getRecommendations } from '../src/lib/files';

import Link from '../src/components/Link';
import { PostFooter } from '../src/components/PostFooter';
import Recommendations from '../src/components/Recommendations';

export const getStaticProps = async () => {
  const recommendations = getRecommendations({ all: true });
  return { props: { recommendations } };
};

const Index = ({
  recommendations,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Themed.h1>Welcome to my Digital Garden</Themed.h1>
      <Themed.p>
        Hello, my name is Pedro. I&apos;m an enthusiastic learner, optimistic,
        and entrepreneur, always trying to find ways to add more value to the
        world. I started this blog to improve my learning processes implementing
        the <Link href="/zettelkasten">Zettelkasten</Link> and to create and
        improve my writing skills. As the project grew, I made some
        functionalities to leverage some activities that I had to do
        repetitively. For example, I created the{' '}
        <Link href="/flashcard">Flashcard</Link> functionality to help me apply
        the spacing learning effect.
      </Themed.p>
      <Themed.p>
        I genuinely believe in the power of sharing and spreading knowledge.
        Every note, article, or book summary is a great way to share and
        leverage my hours dedicated to studying and creating the posts. Instead
        of reading a book and keeping it only with me, I leverage those hours
        sharing and helping others. Doing this is my way of creating serendipity
        and improving my value and status. The opportunities that may arise
        doing this blog are endless.
      </Themed.p>
      <Themed.p style={{ fontStyle: 'italic' }}>
        I&apos;ve also open-sourced this website under the{' '}
        <Link href="/license">CC BY 4.0 license</Link> on{' '}
        <Link href="https://github.com/arantespp/arantespp.com">GitHub</Link>.
      </Themed.p>
      <PostFooter />
      <Recommendations recommendations={recommendations} />
    </>
  );
};

export default Index;
