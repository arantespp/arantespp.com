import { Flex, Image, Text } from 'theme-ui';

const CustomImage = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) => {
  return (
    <Flex
      as="span"
      sx={{
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        marginBottom: 5,
      }}
    >
      <Image
        src={src}
        alt={alt}
        title={caption}
        sx={{ maxHeight: [300, 500], objectFit: 'contain' }}
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
        dangerouslySetInnerHTML={{ __html: caption }}
      />
    </Flex>
  );
};

export default CustomImage;
