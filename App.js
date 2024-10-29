import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#3a4d39' />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  )
}
