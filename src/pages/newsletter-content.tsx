import * as React from 'react';
import { NewsletterContent } from '../../lib/newsletter';
import { PostResume } from '../components/PostResume';
import { Text } from 'theme-ui';
import { fetch } from '../fetch';
import { useQuery } from 'react-query';
import Heading from '../components/Heading';
import Link from '../components/Link';
import Loading from '../components/Loading';

const Newsletter = () => {
  const { data } = useQuery<NewsletterContent>(
    `/api/newsletter/content`,
    async () => fetch(`/api/newsletter/content`).then((r) => r.json()),
    {
      suspense: false,
    },
  );

  if (!data) {
    return <Loading />;
  }

  const { posts, twitterSearchUrl, formattedSince, formattedUntil } = data;

  return (
    <>
      <Heading as="h1">Newsletter Content</Heading>
      <Text>
        Content to create my newsletter, since {formattedSince} until{' '}
        {formattedUntil}.
      </Text>
      <Heading as="h2">Posts</Heading>
      {posts.map((post) => (
        <PostResume key={post.href} post={post} />
      ))}
      <Heading as="h2">Tiny Thought</Heading>
      <Link href={twitterSearchUrl.href}>
        Choose a tweet from this search to be the the Tiny Thought.
      </Link>
    </>
  );
};

export default Newsletter;
