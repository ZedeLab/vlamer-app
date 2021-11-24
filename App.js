import React, { useState } from 'react';
import { LogBox, StyleSheet, YellowBox } from 'react-native';

import * as Front from 'expo-font';
import AppLoading from 'expo-app-loading';
import AuthStack from './src/routes';
import ServicesProviderWrapper from './src/components/hoc/ServiceProviderWappers';

LogBox.ignoreAllLogs();
YellowBox.ignoreWarnings(['Setting a timer']);

const fetchFonts = () => {
  return Front.loadAsync({
    openSans: require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
    'openSans-bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
    'playfair-display': require('./assets/fonts/Playfair_Display/PlayfairDisplaySC-Regular.ttf'),
    'playfair-display-bold': require('./assets/fonts/Playfair_Display/PlayfairDisplaySC-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <ServicesProviderWrapper>
      <AuthStack />
    </ServicesProviderWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
