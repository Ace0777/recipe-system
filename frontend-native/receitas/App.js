// Importando bibliotecas necessárias
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/view/Login.js';
import Home from './src/view/Home.js';
import TelaCadastro from './src/view/TelaCadastro.js'
import { UserContext, UserProvider } from './src/auth/UserContext.js';
import CadastroReceita from './src/view/CadastroReceita.js';
import CadastroIngrediente from './src/view/CadastroIngrediente.js';
import Receitas from './src/view/Receitas.js';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TelaCadastro"
            component={TelaCadastro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CadastroIngrediente"
            component={CadastroIngrediente}
            options={{ headerShown: false }}
          />
            <Stack.Screen
            name="Receitas"
            component={Receitas}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
