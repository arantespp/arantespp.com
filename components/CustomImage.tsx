import { Flex, Image, Text } from 'theme-ui';

const CustomImage = ({
  src,
  alt,
}: // caption,
{
  src: string;
  alt: string;
  // caption: string;
}) => {
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
        alt={altWithoutTags}
        title={altWithoutTags}
        sx={{ maxHeight: [400, 600], objectFit: 'contain' }}
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
