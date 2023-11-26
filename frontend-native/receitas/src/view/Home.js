import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Title, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../auth/UserContext.js';
import Notification from '../util/Notificacao.js';

const Home = () => {
  const navigation = useNavigation();
  const { user, updateUser } = useUserContext();
  const notification = Notification();
  const [profile, setProfile] = useState('');
  const navigateToReceitas = () => {
    navigation.navigate('Receitas');
  };

  const navigateToDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const navigateToCadastroReceita = () => {
    navigation.navigate('CadastroReceita');
  };

  const navigateToCadastroIngrediente = () => {
    navigation.navigate('CadastroIngrediente');
  };

  const handleLogout = () => {
    

    setTimeout(() => {
      notification.show('Usuario deslogado com sucesso! redirecionando...');
    }, 1500);

    navigation.navigate('Login');
    updateUser(null);
  };

  useEffect(() => {
    if (user === undefined || user === null) {
      notification.show('Usuario não autenticado, realize o login.');

      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);

      return;
    }

    if (user.profile === 'ADM') {
      setProfile('ADM')
    } else {
      setProfile('FUNC')
    }
    console.log
    console.log(user);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{user ? `Seja bem-vindo, ${user.nome}!` : ''}</Text>

      <Text style={styles.title}>Selecione uma opção:</Text>

      <Card onPress={navigateToReceitas} style={styles.card}>
        <Card.Content>
          <View style={styles.contentContainer}>
            <IconButton
              icon="nature-people"
              color="white"
              style={styles.icon}
            />
            <Title>Visualizar receitas da comunidade</Title>
          </View>
        </Card.Content>
      </Card>

      <Card
        onPress={navigateToCadastroReceita}
        style={[styles.card, { backgroundColor: '#FFB00A' }]}
      >
        <Card.Content>
          <View style={styles.contentContainer}>
            <IconButton
              icon="food"
              color="white"
              style={styles.icon}
            />
            <Title>Cadastrar nova receita</Title>
          </View>
        </Card.Content>
      </Card>

      <Card onPress={navigateToCadastroIngrediente} style={styles.card}>
        <Card.Content>
          <View style={styles.contentContainer}>
            <IconButton
              icon="food-variant"
              color="white"
              style={styles.icon}
            />
            <Title>Cadastrar novo ingrediente</Title>
          </View>
        </Card.Content>
      </Card>

      <Card onPress={navigateToDashboard} style={[styles.card, { backgroundColor: '#FFB00A' }]} disabled={profile !== 'ADM'}>
        <Card.Content>
          <View style={styles.contentContainer}>
            <IconButton
              icon="information-variant"
              color="white"
              style={styles.icon}
            />
            <Title>Informações do sistema</Title>
          </View>
        </Card.Content>
      </Card>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <IconButton
          icon="logout"
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 35,
  },
  card: {
    marginVertical: 10,
    width: '80%',
    backgroundColor: '#FFA82A',
    color: 'white',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
  },
});

export default Home;
