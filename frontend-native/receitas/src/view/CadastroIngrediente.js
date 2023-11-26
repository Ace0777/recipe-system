import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Notification from '../util/Notificacao.js';

const apiUrl = 'http://54.145.167.97/api';

const CadastroIngrediente = () => {
  const navigation = useNavigation();
  const notification = Notification();
  const { user, updateUser } = useUserContext();
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  const handleNomeChange = (text) => {
    setNome(text);
  };

  const handleQuantidadeChange = (value) => {
    setQuantidade(value);
  };

  const handleAdicionarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const handleDiminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const handleLimparCampos = () => {
    setNome('');
    setQuantidade(1);
  };

  useEffect(() => {
    if (user === undefined || user === null) {
      notification.show('Usuario não autenticado, realize o login.');

      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);

      return;
    }

    console.log(user);
  }, []);

  const handleSubmit = async () => {
    if (nome && quantidade) {
      const novoIngrediente = {
        nome,
        quantidade,
      };

      const url = `${apiUrl}/ingrediente`;

      try {
        const response = await axios.post(url, novoIngrediente);
        console.log('Requisição POST bem-sucedida');
        console.log('Resposta do servidor:', response.data);

        notification.show('Ingrediente cadastrado com sucesso!')
      } catch (error) {
        notification.show('Erro ao cadastrar ingrediente')
        console.error('Falha na requisição:', error);
      }
      handleLimparCampos();
    }
  };

  useEffect(() => {
   
  }, []);

  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 35,
      color: 'black',
    },
    logo: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      marginRight: 10,
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Image source={require('../img/food_icon.png')} style={styles.logo} />
      <Text style={styles.title}>Cadastro Ingrediente</Text>
      <PaperTextInput
        label="Nome do Ingrediente"
        value={nome}
        onChangeText={handleNomeChange}
        style={{ marginBottom: 16 }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <PaperTextInput
          label="Quantidade"
          value={quantidade.toString()}
          onChangeText={(text) => handleQuantidadeChange(Number(text))}
          keyboardType="numeric"
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button onPress={handleAdicionarQuantidade}>Adicionar</Button>
        <Button onPress={handleDiminuirQuantidade}>Diminuir</Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Cadastrar Ingrediente
        </Button>
        <Button mode="outlined" onPress={handleLimparCampos}>
          Limpar Campos
        </Button>
      </View>
    </View>
  );
};

export default CadastroIngrediente;
