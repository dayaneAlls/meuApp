import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';
import { AvatarProvider } from './src/contextAvatar/avatarContext';

export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <AvatarProvider>
          <StatusBar backgroundColor='#3a4d39' />
          <Routes />
        </AvatarProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
