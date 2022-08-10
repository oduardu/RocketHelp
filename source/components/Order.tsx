import { Box, Pressable, HStack, Text, useTheme, VStack, IPressableProps } from 'native-base';

import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native'

type Props = IPressableProps & {
    data: OrderProps,
}

export type OrderProps = {
    id: string;
    patrimony: string;
    when: string;
    status: 'open' | 'closed';
  }

export function Order({data, ...rest} : Props) {

    const { colors } = useTheme();
    const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300];


  return (
    <Pressable
        {...rest}
    >
    <HStack
        bg='gray.600'
        mb={4}
        alignItems='center'
        justifyContent='space-between'
        rounded='sm'
        overflow='hidden'
    >

        <Box h='full' w={2} bg={statusColor}/>
        <VStack  flex={1} my={5} ml={5}>
            <Text
            color='white'
            fontSize='xs'
            bold
            >
                Patrimônio {data.patrimony}
            </Text>
            <HStack alignItems='center'>
                <ClockAfternoon size={15} color={colors.gray[300]} />
                <Text color='gray.200' fontSize='xs' ml={1}>
                    {data.when}
                </Text>
            </HStack>
        </VStack>
        <Box bg='gray.500' h={12} w={12} mr={5} rounded='full' alignItems='center' justifyContent='center'>
            {data.status === 'closed' ? <CircleWavyCheck size={24} color={colors.green[300]} /> : <Hourglass size={24} color={colors.secondary[700]} />}
        </Box>
    </HStack>
    </Pressable>
  );
}