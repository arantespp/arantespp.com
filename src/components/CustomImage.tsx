import { Flex, Image, Text, BaseStyles } from 'theme-ui';

const CustomImage = ({ src, alt }: { src: string; alt: string }) => {
  const newAlt = alt.replace(
    /<a /g,
    '<a target="_blank" rel="noopener noreferrer" ',
  );

  /**
   * https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
   */
  const altWithoutTags = newAlt.replace(/(<([^>]+)>)/gi, '');

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
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
          marginBottom: 1,
        }}
      />
      <BaseStyles>
        <Text
          as="p"
          sx={{
            fontSize: 1,
            fontStyle: 'italic',
            textAlign: 'center',
          }}
          dangerouslySetInnerHTML={{ __html: newAlt }}
        />
      </BaseStyles>
    </Flex>
  );
};

export default CustomImage;
