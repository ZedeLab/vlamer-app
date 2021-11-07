import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { Provider as PageProvider, Headline } from 'react-native-paper';

import { Provider as StateProvider } from 'react-redux';

import * as Front from 'expo-font';
import AppLoading from 'expo-app-loading';
import AuthStack from './src/routes';
import theme from './src/utils/theme';
import { AuthContext, AuthProvider } from './src/services/auth';
import { store } from './src/store/store';
import { StaticDataProvider } from './src/services/staticURLs';

LogBox.ignoreAllLogs();
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
    <StaticDataProvider>
      <StateProvider store={store}>
        <PageProvider theme={theme}>
          <AuthProvider>
            <AuthStack />
          </AuthProvider>
        </PageProvider>
      </StateProvider>
    </StaticDataProvider>
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
