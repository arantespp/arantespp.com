import { Flex, Image, Text } from 'theme-ui';

const CustomImage = ({ src, alt }: { src: string; alt: string }) => {
  /**
   * https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
   */
  const altWithoutTags = alt.replace(/(<([^>]+)>)/gi, '');
  return (
    <Flex
      as="span"
      sx={{
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        marginY: 4,
      }}
    >
      <Image
        src={src}
        loading="lazy"
        alt={altWithoutTags}
        title={altWithoutTags}
        sx={{
          maxHeight: [400, 600],
          objectFit: 'contain',
          height: '100%',
          width: '100%',
        }}
      />
      <Text
        as="span"
        sx={{
          marginTop: 1,
          fontSize: 1,
          fontStyle: 'italic',
          textAlign: 'center',
          a: {
            color: 'secondary',
          },
        }}
        dangerouslySetInnerHTML={{ __html: alt }}
      />
    </Flex>
  );
};

export default CustomImage;
