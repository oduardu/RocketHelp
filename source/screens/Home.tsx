import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Loading } from '../components/Loading';


import { dateFormat } from '../utils/firestoreDateFormat';

export function Home() {
    const [loading, setLoading] = useState(true)
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<OrderProps[]>([]);
    const [countOrders, setCountOrders] = useState<number>();
    
    const { colors } = useTheme();

    const navigation = useNavigation();
    function handleNewOrder() {
        navigation.navigate('register');
    }

    function handleDetails(orderId: string) {
        navigation.navigate('details', { orderId });
    }

    function handleSignOut() {
        Auth().signOut()
        .catch(error => {
            console.log(error)
        }
        )
    }

    useEffect(() => {
        setLoading(true)

        const subscription = firestore()
        .collection('orders')
        .where('status', '==', statusSelected)
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {
                const { patrimony, description, status, create_at} = doc.data();
                return {
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    when: dateFormat(create_at)
                }
            }
            )
            setOrders(data)
            setLoading(false)
            setCountOrders(data.length)
        }
        )
        return subscription
    }, [ statusSelected ])

  return (
    <VStack flex={1} pb={6} bg='gray.700'>
        <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.600'
        pb={5}
        pt={12}
        px={6}
        >
            <Logo />
            <IconButton
                icon={<SignOut size={26} color={colors.gray[300]} />}
                onPress={handleSignOut}
                />
        </HStack>
        <VStack 
        flex={1}
        px={6}>
        <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        mt={8}
        mb={4}
        >
            <Heading
                color='gray.100'
            >
                Meus Chamados
            </Heading>
        <Text
            color='gray.200'
        >
            {countOrders}
        </Text>
        </HStack>

        <HStack space={3} mb={8}>
            <Filter 
                title='em andamento'
                type='open'
                onPress={() => setStatusSelected('open')}
                isActive={statusSelected === 'open'}
            />
            <Filter 
                title='finalizados'
                type='closed'
                onPress={() => setStatusSelected('closed')}
                isActive={statusSelected === 'closed'}
            />
        </HStack>

{ loading ? <Loading /> :
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Order
                    data={item}
                    onPress={() => handleDetails(item.id)}
                />
            )}
            contentContainerStyle={{paddingBottom: 100}}
            ListEmptyComponent={() => (
                <Center>
                    <ChatTeardropText color={colors.gray[300]} size={40}/>
                    <Text color={colors.gray[300]} fontSize='xl' mt={6} textAlign='center'>
                        Você ainda não possui {'\n'}
                        chamados {statusSelected === 'open' ? 'em andamento' : 'finalizados'}.
                    </Text>
                </Center>
                )}
        />}

        <Button
            title='Novo chamado'
            onPress={handleNewOrder}
        />
        </VStack>

    </VStack>
  );
}