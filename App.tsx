import React from 'react';
import {Routes} from './source/routes'

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { THEME } from './source/styles/theme';

import { NativeBaseProvider, StatusBar } from 'native-base'

import {Loading} from './source/components/Loading';

export default function App() {

  const [ fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
        <StatusBar barStyle="light-content" 
        backgroundColor="transparent"
        translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}