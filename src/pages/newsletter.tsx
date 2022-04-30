import * as React from 'react';
import { Button, Flex, Input, Themed } from 'theme-ui';
import { useQuery } from 'react-query';

import Flashcard from '../components/Flashcard';
import Heading from '../components/Heading';
import Link from '../components/Link';
import Loading from '../components/Loading';

import type { NewsletterData } from '../../lib/newsletter';

const saveNewsletterItems = async (item: any) => {
  return fetch('/api/newsletter/items', {
    method: 'PUT',
    body: JSON.stringify(item),
  });
};

const Newsletter = () => {
  const { data } = useQuery<NewsletterData>(`/api/newsletter`, async () =>
    fetch(`/api/newsletter`).then((r) => r.json()),
  );

  const readingInputRef = React.useRef<HTMLInputElement>(null);

  if (!data) {
    return <Loading />;
  }

  const { flashcard, twitterSearchUrl } = data;

  return (
    <>
      <Heading level={1}>Newsletter</Heading>
      <Themed.p>
        This page is my tool to create my newsletter following the format
        proposed in <Link href="/a/newsletter-v1">this article.</Link>
      </Themed.p>
      <Heading level={2}>Items</Heading>
      <Heading level={3}>Reading</Heading>
      <Flex>
        <Input ref={readingInputRef} />
        <Button
          onClick={() => {
            const value = readingInputRef.current?.value;
            if (value) {
              saveNewsletterItems({ reading: value });
            }
          }}
          sx={{ marginLeft: 2 }}
        >
          Save
        </Button>
      </Flex>
      <Heading level={3}>Tweet</Heading>
      <Link href={twitterSearchUrl.href}>
        Choose a tweet from this search to be featured on the newsletter.
      </Link>
      <Heading level={3}>Spacing Effect</Heading>
      <Flashcard flashcard={flashcard} />
    </>
  );
};

export default Newsletter;
