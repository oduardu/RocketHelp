import { VStack, Heading, Icon, useTheme } from "native-base";
import { Alert } from 'react-native'

import auth from '@react-native-firebase/auth'

import { Envelope, Key } from 'phosphor-react-native'
import Logo from '../assets/logo_primary.svg';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { colors } = useTheme();

    const handleSignIn = async () => {
        if(!email || !password) {
            return Alert.alert('Entrar','Preencha todos os campos')
        }
        setLoading(true);

        auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
            console.log(error)
            setLoading(false);
            if(error.code === 'auth/user-not-found') {
                Alert.alert('Entrar','Email ou Senha incorreta')
            } else if(error.code === 'auth/wrong-password') {
                Alert.alert('Entrar','Email ou Senha incorreta')
            } else if(error.code === 'auth/invalid-email') {
                Alert.alert('Entrar','Email inválido')
            } else if(error.code === 'auth/user-disabled') {
                Alert.alert('Entrar','Usuário desabilitado')
            }
            return Alert.alert('Entrar','Erro ao entrar')
        }

        )

    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.900" px={8} pt={24} >
            <Logo />
            <Heading color="gray.100" fontSize="xl"  mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input placeholder='E-mail' 
                   mb={4}
                    InputLeftElement={
                        <Icon as={<Envelope color={colors.gray[300]}/>} ml={4} />
                    }
                    keyboardType="email-address"
                    onChangeText={setEmail}
            />
            <Input placeholder='Senha'
                InputLeftElement={
                    <Icon as={<Key color={colors.gray[300]}/>} ml={4} />
                }
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button title="Entrar" onPress={handleSignIn}
            isLoading={loading}
            />
            
        </VStack>
    );
}