import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const navigateToReceitas = () => {
        navigation.navigate('Receitas');
    };

    const navigateToCadastroReceita = () => {
        navigation.navigate('CadastroReceita');
    };

    const navigateToCadastroIngrediente = () => {
        navigation.navigate('CadastroIngrediente');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione uma opção:</Text>
            <Button
                style={styles.button}
                mode="contained"
                onPress={navigateToReceitas}
            >
                Visualizar receitas da comunidade
            </Button>
            <Button
                style={styles.buttonAmarelo}
                mode="contained"
                labelStyle={{ color: 'black' }}
                onPress={navigateToCadastroReceita}
            >
                Cadastrar nova receita
            </Button>
            <Button
                style={styles.button}
                mode="contained"
                onPress={navigateToCadastroIngrediente}
            >
                Cadastrar novo ingrediente
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: 10,
        width: '80%',
    },
    buttonAmarelo: {
        marginVertical: 10,
        width: '80%',
        backgroundColor: '#F5B820',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 35,
    },
});

export default Home;
