import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import * as React from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Link,
  Text,
  Themed,
  ThemeProvider,
} from 'theme-ui';

import type { InstagramPost as InstagramPostProps } from '../../lib/files';

import HTMLHeaders from './HTMLHeaders';
import Loading from './Loading';
import Markdown from './Markdown';
import PedroArantes from './PedroArantes';

const PostsGrid = ({
  pages,
  postsRefs,
  url,
}: {
  pages: string[];
  postsRefs?: React.MutableRefObject<HTMLDivElement[]>;
  url?: string;
}) => {
  const size = 1080;

  const margin = size * 0.15;

  const h1Size = 58;

  /**
   * Major Second
   * https://twitter.com/siddharthkp/status/1262038126794551296/photo/1
   */
  const fontRatio = 5 / 6;

  const fontSizes = [...new Array(6)]
    .map((_, index) => Math.round(h1Size * fontRatio ** index))
    .reverse();

  return (
    <Box
      sx={{
        width: 0,
        height: 0,
        overflow: 'hidden',
      }}
    >
      {pages.map((page, index) => {
        const key = [index, size].join('-');

        const isFirstPage = index === 0;
        const isLastPage = index === pages.length - 1;

        return (
          <ThemeProvider
            key={key}
            theme={{
              fontSizes,
              styles: {
                h1: {
                  fontSize: 5,
                  textAlign: 'center',
                  marginTop: 0,
                },
                h2: {
                  fontSize: 4,
                  marginTop: 0,
                  paddingBottom: 3,
                  '&:not(:first-child)': {
                    marginTop: 5,
                  },
                },
                h3: {
                  fontSize: 3,
                  marginTop: 0,
                  paddingBottom: 3,
                  '&:not(:first-child)': {
                    marginTop: 5,
                  },
                },
                p: {
                  color: 'text',
                  fontSize: isLastPage ? 3 : 2,
                },
                ul: {
                  color: 'text',
                  fontSize: isLastPage ? 3 : 2,
                },
                li: {
                  color: 'text',
                  fontSize: isLastPage ? 3 : 2,
                },
                strong: {
                  color: 'primary',
                },
                a: {
                  textDecorationLine: 'none',
                },
              },
            }}
          >
            <Box
              ref={(element) => {
                if (postsRefs && element) {
                  // eslint-disable-next-line no-param-reassign
                  postsRefs.current[index] = element;
                }
              }}
              sx={{
                position: 'relative',
                width: size,
                height: size,
                backgroundColor: 'background',
              }}
            >
              {url && (
                <Link
                  href={url}
                  sx={{
                    position: 'absolute',
                    top: margin / 2,
                    right: margin / 2,
                    transform: 'translateY(-50%)',
                    fontSize: 1,
                  }}
                >
                  {url}
                </Link>
              )}

              {!isFirstPage && (
                <Text
                  sx={{
                    position: 'absolute',
                    bottom: margin / 2,
                    transform: 'translateY(50%)',
                    color: 'text',
                    fontSize: 1,
                    right: margin / 2,
                  }}
                >
                  {index + 1}/{pages.length}
                </Text>
              )}

              {isLastPage && (
                <Flex
                  sx={{
                    position: 'absolute',
                    bottom: margin / 2,
                    transform: 'translateY(50%)',
                    color: 'text',
                    fontSize: 2,
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <PedroArantes />
                </Flex>
              )}

              <Flex
                sx={{
                  flexDirection: 'column',
                  padding: margin,
                  height: '100%',
                  ...(isLastPage
                    ? {
                        justifyContent: 'space-evenly',
                        textAlign: 'center',
                        fontStyle: 'italic',
                      }
                    : {}),
                }}
              >
                <Markdown
                  content={page}
                  noH1={false}
                  components={{
                    img: ({ ...props }) => (
                      <Flex
                        sx={{
                          justifyContent: 'center',
                          height: '100%',
                          width: '100%',
                        }}
                      >
                        <Image
                          {...props}
                          sx={{
                            border: '1px solid black',
                            borderColor: 'muted',
                          }}
                        />
                      </Flex>
                    ),
                  }}
                />
              </Flex>
            </Box>
          </ThemeProvider>
        );
      })}
    </Box>
  );
};

const useImages = ({ slug }: { slug: string }) => {
  const postsRefs = React.useRef<HTMLDivElement[]>([]);

  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (postsRefs.current.length === 0) {
      return;
    }

    (async () => {
      const tmpImages: string[] = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const [index, element] of Array.from(postsRefs.current.entries())) {
        // eslint-disable-next-line no-await-in-loop
        const canvas = await html2canvas(element, {
          /**
           * https://stackoverflow.com/a/64436175/8786986
           */
          scale: 5,
          useCORS: true,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight,
        });

        const imageBase64 = canvas.toDataURL();
        tmpImages[index] = imageBase64;
      }

      setImages(tmpImages);
    })();
  }, [postsRefs.current.length]);

  const loadingImages = images.length === 0;

  const [downloading, setDownloading] = React.useState(false);

  const download = React.useCallback(async () => {
    if (images.length > 0) {
      setDownloading(() => true);
      const zip = new JSZip();
      images.forEach((base64, index) =>
        zip.file(`${index + 1}.png`, base64.substr(22), { base64: true }),
      );
      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `${slug}.zip`);
      setDownloading(false);
    }
  }, [images, slug]);

  return { download, postsRefs, images, loadingImages, downloading };
};

const getInstagramDescription = (content: string) => {
  /**
   * Minus five for margin.
   */
  const MAX_CHARACTERS = 2200 - 5;

  const hashtags = `\n\n${[
    '#livros',
    '#resumos',
    '#leitura',
    '#leituradodia',
    '#ler',
  ].join(' ')}`;

  return `${content
    .replace(/---/g, '')
    .replace(/\*\*/g, '')
    .replace(/\n+/g, '\n\n')
    .substring(0, MAX_CHARACTERS - 5 - hashtags.length)
    .split('\n\n')
    .filter((_, index, arr) => index !== arr.length - 1)
    .join('\n\n')}\n\n...${hashtags}`.trim();
};

const InstagramPost = ({
  content,
  slug,
  title,
  url,
  instagramUrl,
  image,
}: InstagramPostProps) => {
  const [contentInput, setContentInput] = React.useState(content);

  const { postsRefs, download, images, loadingImages, downloading } = useImages(
    { slug },
  );

  const firstPost = `# ${title}\n\n![image](${image})`;

  const lastPost = `Acesse [${url}](https://${url}) para ver o resumo completo (em Inglês) do livro **${title}**.`;

  const pages = [
    firstPost,
    ...contentInput
      .split('\n---\n')
      .map((page) => page.trim())
      .slice(0, 8),
    lastPost,
  ];

  const instagramDescription = getInstagramDescription(
    `# ${title}\n\n${contentInput}`,
  );

  return (
    <>
      <HTMLHeaders title={title} />

      <PostsGrid {...{ pages, postsRefs, url }} />

      <Themed.h1>{title}</Themed.h1>

      <Themed.h2>Instagram Posts</Themed.h2>

      {instagramUrl && (
        <Link href={instagramUrl}>See the post on Instagram.</Link>
      )}

      <Text as="p" sx={{ fontStyle: 'italic', fontSize: 1 }}>
        Note: you may see that the Instagram post and below are different. This
        may happen because I used a different design system when I generated the
        Instagram post.
      </Text>

      {loadingImages ? (
        <Loading />
      ) : (
        <Grid columns={[1, null, 1]} gap={4} sx={{ marginTop: 4 }}>
          {images.map((post, index) => {
            const key = index;
            return (
              <Box key={key} sx={{ border: '1px solid', borderColor: 'muted' }}>
                <Image src={post} sx={{ width: '100%', height: '100%' }} />
              </Box>
            );
          })}
        </Grid>
      )}

      <Flex sx={{ width: '100%', justifyContent: 'center', marginY: 5 }}>
        <Button disabled={downloading} onClick={download}>
          Download
        </Button>
      </Flex>

      <Themed.h2>Markdown</Themed.h2>
      <Themed.pre
        style={{ overflowX: 'hidden', cursor: 'pointer' }}
        onClick={() => navigator.clipboard.writeText(instagramDescription)}
      >
        <Text sx={{ whiteSpace: 'pre-wrap' }}>{instagramDescription}</Text>
      </Themed.pre>
    </>
  );
};

export default InstagramPost;
