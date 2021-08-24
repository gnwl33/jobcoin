import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {Colors as c} from './styles';
import AppContext from './utils/AppContext';
import SignIn from './screens/signin/SignIn';
import Account from './screens/account/Account';
import {RootStackParamList} from './utils/types';

const theme = {
  ...DefaultTheme,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: c.black,
    accent: c.blue,
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [user, setUser] = useState('');

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AppContext.Provider value={{user, setUser}}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="Account" component={Account} />
            </Stack.Navigator>
            <Toast ref={ref => Toast.setRef(ref)} />
          </NavigationContainer>
        </AppContext.Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
