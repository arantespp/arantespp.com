import useSWR from 'swr';

import Flashcard from '../src/components/Flashcard';
import Heading from '../src/components/Heading';
import Link from '../src/components/Link';
import Loading from '../src/components/Loading';

import type { NewsletterData } from '../src/lib/getNewsletterData';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Newsletter = () => {
  const { data } = useSWR<NewsletterData>(`/api/newsletter`, fetcher);

  if (!data) {
    return <Loading />;
  }

  const { flashcard, twitterSearchUrl } = data;

  return (
    <>
      <Heading level={1}>Newsletter</Heading>
      <Heading level={2}>Tweet</Heading>
      <Link href={twitterSearchUrl.href}>
        Choose a tweet from this search to be featured on the newsletter.
      </Link>
      <Heading level={2}>Spacing Effect</Heading>
      <Flashcard flashcard={flashcard} />
    </>
  );
};

export default Newsletter;
