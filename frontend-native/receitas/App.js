// Importando bibliotecas necessárias
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-fast-toast'
import Login from './src/view/Login.js';
import Home from './src/view/Home.js';
import TelaCadastro from './src/view/TelaCadastro.js'
import { UserContext, UserProvider } from './src/auth/UserContext.js';
import CadastroReceita from './src/view/CadastroReceita.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ToastProvider>
      <UserProvider>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CadastroReceita"
            component={CadastroReceita}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="TelaCadastro"
            component={TelaCadastro}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </UserProvider>
      </ToastProvider>
    </NavigationContainer>
  );
};

export default App;
