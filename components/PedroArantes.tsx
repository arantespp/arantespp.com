import { Image, Text, TextProps } from 'theme-ui';

const PedroArantes = ({ ref, ...props }: TextProps) => {
  return (
    <Text
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        ...props.sx,
      }}
    >
      Pedro Arantes
      {/**
       * Use Image instead emoji because not every browser render the
       * rose in the same way.
       **/}
      <Image sx={{ height: '1.2em', marginLeft: 1 }} src="/rose.png" />
    </Text>
  );
};

export default PedroArantes;
