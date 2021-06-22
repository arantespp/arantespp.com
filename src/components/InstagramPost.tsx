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
}: {
  pages: string[];
  postsRefs?: React.MutableRefObject<HTMLDivElement[]>;
}) => {
  const size = 1080;

  return (
    <Box
      sx={{
        width: 0,
        height: 0,
        overflow: 'hidden',
        textShadow: '5px 5px 5px #000',
      }}
    >
      <ThemeProvider
        theme={{
          colors: { text: 'white' },
          styles: {
            h1: {
              color: 'orange',
              textAlign: 'center',
              fontSize: 65,
              marginTop: 0,
              marginBottom: 3,
            },
            h2: {
              color: 'orange',
              fontSize: 60,
              marginTop: 0,

              '&:not(:first-child)': {
                marginTop: 5,
              },
            },
            p: {
              color: 'text',
              fontSize: 50,
            },
            ul: {
              color: 'text',
              fontSize: 50,
            },
            a: {
              color: 'text',
            },
          },
        }}
      >
        {pages.map((page, index) => {
          const key = [index, size].join('-');
          const isLastPage = index === pages.length - 1;

          return (
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
                backgroundImage:
                  'url(/images/kevin-ku-aiyBwbrWWlo-unsplash.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPositionX: `${(index * 100) / (pages.length - 1)}%`,
              }}
            >
              <Text
                as="a"
                sx={{
                  position: 'absolute',
                  top: 60,
                  right: 60,
                  transform: 'translateY(-50%)',
                  color: 'white',
                  fontSize: 30,
                  textDecoration: 'underline',
                }}
              >
                arantespp.com/no-bs-time
              </Text>

              <Text
                sx={{
                  position: 'absolute',
                  bottom: 30,
                  color: 'white',
                  fontSize: 30,
                  right: 60,
                }}
              >
                {index + 1}/{pages.length}
              </Text>

              {isLastPage && (
                <Flex
                  sx={{
                    position: 'absolute',
                    bottom: 30,
                    color: 'white',
                    fontSize: 40,
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
                  padding: 100,
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
                    img: (props) => (
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
          );
        })}
      </ThemeProvider>
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

const InstagramPost = ({ content, slug, title }: InstagramPostProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contentInput, setContentInput] = React.useState(content);

  const { postsRefs, download, images, loadingImages, downloading } = useImages(
    { slug },
  );

  const pages = contentInput.split('\n---\n').map((page) => page.trim());

  return (
    <>
      <HTMLHeaders title={title} />

      <PostsGrid pages={pages} postsRefs={postsRefs} />

      <Themed.h1>{title}</Themed.h1>

      <Themed.h2>Instagram Posts</Themed.h2>

      {loadingImages ? (
        <Loading />
      ) : (
        <Grid columns={[1, null, 2]} gap={4}>
          {images.map((image, index) => {
            const key = index;
            return (
              <Box key={key}>
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
