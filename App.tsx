/* eslint-disable react/style-prop-object */
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppLoading } from 'expo';

import {
  PublicSans_100Thin,
  Manrope_300Light,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/dev';

import Dashboard from './src/pages/Dashboard';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Manrope_700Bold,
    Manrope_300Light,
    PublicSans_100Thin,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <>
      <Dashboard />
      <StatusBar style="light" backgroundColor="transparent" translucent />
    </>
  );
};

export default App;
