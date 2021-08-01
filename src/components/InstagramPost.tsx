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

import type { InstagramPost as InstagramPostProps } from '../lib/files';

import HTMLHeaders from './HTMLHeaders';
import Loading from './Loading';
import Markdown from './Markdown';
import PedroArantes from './PedroArantes';

const PostsGrid = ({
  pages,
  postsRefs,
  header,
}: {
  pages: string[];
  postsRefs?: React.MutableRefObject<HTMLDivElement[]>;
  header?: string;
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
        const isLastPage = index === pages.length - 1;

        return (
          <ThemeProvider
            theme={{
              fontSizes,
              styles: {
                h1: {
                  textAlign: 'center',
                  marginTop: 0,
                },
                h2: {
                  marginTop: 0,
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
              },
            }}
          >
            <Box
              key={key}
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
              {header && (
                <Link
                  href="https://arantespp.com/no-bs-time"
                  sx={{
                    position: 'absolute',
                    top: margin / 2,
                    right: margin / 2,
                    transform: 'translateY(-50%)',
                    fontSize: 1,
                  }}
                >
                  {header}
                </Link>
              )}

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
                    img: ({ ref, ...props }) => (
                      <Flex
                        sx={{
                          justifyContent: 'center',
                          height: '100%',
                          width: '100%',
                        }}
                      >
                        <Image {...props} />
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

const InstagramPost = ({
  content,
  slug,
  title,
  header,
  instagramUrl,
}: InstagramPostProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contentInput, setContentInput] = React.useState(content);

  const { postsRefs, download, images, loadingImages, downloading } = useImages(
    { slug },
  );

  const pages = contentInput.split('\n---\n').map((page) => page.trim());

  return (
    <>
      <HTMLHeaders title={title} />

      <PostsGrid {...{ pages, postsRefs, header }} />

      <Themed.h1>{title}</Themed.h1>

      <Themed.h2>Instagram Posts</Themed.h2>

      <Link href={instagramUrl}>See the post on Instagram.</Link>

      <Text as="p" sx={{ fontStyle: 'italic', fontSize: 1 }}>
        Note: you may see that the Instagram post and below are different. This
        may happen because I used a different design system when I generated the
        Instagram post.
      </Text>

      {loadingImages ? (
        <Loading />
      ) : (
        <Grid columns={[1, null, 1]} gap={4} sx={{ marginTop: 4 }}>
          {images.map((image, index) => {
            const key = index;
            return (
              <Box key={key} sx={{ border: '1px solid', borderColor: 'muted' }}>
                <Image src={image} sx={{ width: '100%', height: '100%' }} />
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
      <Themed.pre>
        <Text sx={{ whiteSpace: 'pre-wrap' }}>{contentInput}</Text>
      </Themed.pre>
    </>
  );
};

export default InstagramPost;
