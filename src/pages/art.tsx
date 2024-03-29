import { Box, Text, Themed } from 'theme-ui';
import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import Heading from '../components/Heading';
import Link from '../components/Link';
import Script from 'next/script';
import art from '../../posts/art/art.json';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * https://github.com/ProjectOpenSea/embeddable-nfts
       */
      'nft-card': {
        contractAddress: string;
        tokenId: string;
        vertical?: boolean;
      };
    }
  }
}

export const getStaticProps = async () => {
  const arts = art.arts
    .flatMap((art) =>
      art.tokens.map((tokenId) => ({
        contractAddress: art.contractAddress,
        tokenId,
      })),
    )
    .reverse();

  return { props: { arts } };
};

const URL = process.env.NEXT_PUBLIC_URL as string;

const description =
  "It's fascinating the mixture of digital art NFTs' aesthetics and the technology behind blockchain and its potential applications.";

const Art = ({ arts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        {...{
          title: "Pedro Arantes' Art",
          description,
          openGraph: {
            type: 'website',
            url: `${URL}/art`,
            images: [
              {
                url: `${URL}/images/nfts/viking-working-out.webp`,
                alt: 'Viking Working Out',
              },
            ],
          },
        }}
      />
      <Script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js" />
      <Heading as="h1">Digital Art</Heading>
      <Themed.p>{description}</Themed.p>
      <Themed.p>
        Below are some of the NFTs I&#39;ve minted on{' '}
        <Link href="https://opensea.io/collection/arantespp">Opensea</Link>{' '}
        sorted by most recent first. There&#39;s no specific theme, and it&#39;s
        a collection of digital art I created with inspirations that I had at
        the moment, place, or by people I admire.
      </Themed.p>
      <Box sx={{ marginTop: 5 }}>
        {arts.map((art) => {
          return (
            <Box
              key={art.tokenId}
              sx={{
                marginY: 5,
              }}
            >
              <nft-card {...art} />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Art;
