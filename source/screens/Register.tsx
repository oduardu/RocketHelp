import { VStack } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useState } from 'react';
import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  function handleSubmit() {
    if(!patrimony || !description) {
      return Alert.alert('', 'Preencha todos os campos')
    }
    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      create_at: firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      setIsLoading(false);
      navigation.goBack()
      Alert.alert('', 'Pedido criado com sucesso');
    }).catch(error => {
      setIsLoading(false);
      console.log(error.message);
    }
    )
  }

  return (
    <VStack flex={1} p={6} bg='gray.600'>
        <Header title='Nova Solicitação' />
        <Input  
            placeholder='Número do Patrimônio'
            mt={4}
            onChangeText={setPatrimony}
        />
        <Input  
            placeholder='Descrição do problema'
            flex={1}
            mt={5}
            multiline
            textAlignVertical='top'
            onChangeText={setDescription}
        />
        <Button 
            title='Cadastrar'
            mt={5}
            onPress={handleSubmit}
            isLoading={isLoading}
        />
    </VStack>
  );
}