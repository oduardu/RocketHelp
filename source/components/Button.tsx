import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
  title: string,
}

export function Button({ title, ...rest }: Props ) {
  return (
    <NativeBaseButton
    {...rest}
    bg='green.500'
    h={14}
    w='100%'
    mt={8}
    >
        <Heading
        color='white'
        >
            {title}
        </Heading>
    </NativeBaseButton>
  );
}