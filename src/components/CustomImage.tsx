import { Flex, Image, Text, useThemeUI } from 'theme-ui';

const CustomImage = ({ src, alt }: { src: string; alt: string }) => {
  /**
   * https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
   */
  const altWithoutTags = alt.replace(/(<([^>]+)>)/gi, '');

  const {
    theme: { styles },
  } = useThemeUI();

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
          minHeight: [100, 300],
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
          a: styles?.a,
        }}
        dangerouslySetInnerHTML={{ __html: alt }}
      />
    </Flex>
  );
};

export default CustomImage;
