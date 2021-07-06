import 'react-native-gesture-handler';
import React from 'react';

import SignUpScreen from './src/Screen/SignUpScreen';
import LoginScreen from './src/Screen/LoginScreen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    accent: '#f1c40f',
  },
};
const Stack = createStackNavigator();
const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
