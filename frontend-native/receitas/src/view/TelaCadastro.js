import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Notification from '../util/Notificacao.js';
import axios from 'axios';

const apiUrl = "http://54.145.167.97/api";

const CadastroUsuario = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const notification = Notification();

  const handleCadastro = async () => {
    const url = `${apiUrl}/usuario`;
    const data = {
      name: nome,
      email: email,
      senha: senha,
    };

    try {
      const response = await axios.post(url, data);

      console.log('Requisição POST bem-sucedida');
      console.log('Resposta do servidor:', response.data);

      notification.show("Usuario cadastrado com sucesso!")
      setTimeout(() => {
        // Navegue para a tela de login após o cadastro
        navigation.navigate('Login');
      }, 2000);

    } catch (error) {
   
      notification.show("Erro no cadastro!")
      console.error('Falha na requisição:', error);
    }
  };

  return (
    <View style={styles.container}>
        <Image
        source={require('../img/food_icon.png')}
        style={styles.logo}
        />

      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        label="Nome"
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
        style={styles.input}
      />

      <TextInput
        label="Email"
        placeholder="Digite seu email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <TextInput
        label="Senha"
        placeholder="Digite sua senha"
        value={senha}
        secureTextEntry
        onChangeText={(text) => setSenha(text)}
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleCadastro} style={styles.button}>
          Cadastrar
        </Button>
        <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
          Voltar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default CadastroUsuario;
