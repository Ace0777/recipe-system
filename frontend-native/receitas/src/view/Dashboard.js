import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { useUserContext } from '../auth/UserContext.js';
import { useNavigation } from '@react-navigation/native';
import Notification from '../util/Notificacao.js';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const Dashboard = () => {
    const notification = Notification();
    const navigation = useNavigation();
    const { user } = useUserContext();
    const apiUrl = "http://54.145.167.97/api";

    const [quantidadeReceitas, setQuantidadeReceitas] = useState(0);
    const [quantidadeMinhasReceitas, setQuantidadeMinhasReceitas] = useState(0);
    const [quantidadeIngredientes, setQuantidadeIngredientes] = useState(0);
    const [quantidadeUsuarios, setQuantidadeUsuarios] = useState(0);
    const [receitaMaisCurtida, setReceitaMaisCurtida] = useState(null);

    const buscaQuantidadeReceitas = async () => {
        let url = `${apiUrl}/receita`;

        try {
            const response = await axios.get(url);
            setQuantidadeReceitas(response.data.$values.length);
        } catch (error) {
            console.error('Falha na requisição:', error);
        }
    };

    const buscaQuantidadeIngredientes = async () => {
        let url = `${apiUrl}/ingrediente`;

        try {
            const response = await axios.get(url);
            setQuantidadeIngredientes(response.data.$values.length);
        } catch (error) {
            console.error('Falha na requisição:', error);
        }
    };
     
    const buscaQuantidadeMinhasReceitas = async () => {
        let url = `${apiUrl}/receita/usuario/${user.id}`;
        try {
          const response = await axios.get(url);
          setQuantidadeMinhasReceitas(response.data.$values.length);
        } catch (error) {
          console.error('Falha na requisição:', error);
        }
      };

      const buscaQuantidadeUsuarios = async () => {
        let url = `${apiUrl}/usuario`;
        try {
          const response = await axios.get(url);
          setQuantidadeUsuarios(response.data.$values.length);
        } catch (error) {
          console.error('Falha na requisição:', error);
        }
      };
   

    const buscaReceitaMaisCurtida = async () => {
        let url = `${apiUrl}/receita`;

        try {
            const response = await axios.get(url);
            const receitas = response.data.$values;

            if (receitas.length > 0) {
                receitas.sort((a, b) => b.curtidas - a.curtidas);

                const maisCurtida = receitas[0];

                setReceitaMaisCurtida(maisCurtida);
            } else {
                console.warn('Nenhuma receita encontrada.');
            }
        } catch (error) {
            console.error('Falha na requisição:', error);
        }
    };

    useEffect(() => {
        if (user === undefined || user === null) {
            notification.show("Usuario não autenticado, realize o login.")
            navigation.navigate('Login');
            return;
        } else if (user.profile !== 'ADM') {
            notification.show("Usuario não possui permissão.")
            navigation.navigate('Home');
            return;
        }

        buscaQuantidadeReceitas();
        buscaQuantidadeIngredientes();
        buscaReceitaMaisCurtida();  
        buscaQuantidadeMinhasReceitas();
        buscaQuantidadeUsuarios();
    }, []);

    const data = {
        labels: ["Receitas", "Ingredientes"],
        datasets: [
            {
                data: [quantidadeReceitas, quantidadeIngredientes],
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title} ><Icon name="areachart" size={24} /> informações do sistema</Text>

            <BarChart
                style={styles.chart}
                data={data}
                width={300}
                height={200}
                yAxisLabel=""
                chartConfig={{
                    backgroundGradientFrom: '#f1f1f1',
                    backgroundGradientTo: '#f1f1f1',
                    color: (opacity = 1) => `rgba(255, 168, 42, ${opacity})`, // Cor definida como #FFA82A
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    fontSize: 12, // Ajuste o tamanho da fonte conforme necessário
                }}
            />

            <Text style={styles.text}><Text style={{fontWeight:'bold'}}>Total de Receitas:</Text> {quantidadeReceitas}</Text>
            <Text style={styles.text}><Text style={{fontWeight:'bold'}}>Total de Ingredientes:</Text> {quantidadeIngredientes}</Text>
            <Text style={styles.text}><Text style={{fontWeight:'bold'}}>Receita mais curtida:</Text> {receitaMaisCurtida?.nome}</Text>
            <Text style={styles.text}><Text style={{fontWeight:'bold'}}>Total de receitas cadastradas por mim:</Text> {quantidadeMinhasReceitas}</Text>
            <Text style={styles.text}><Text style={{fontWeight:'bold'}}>Quantidade de usuarios cadastrados na plataforma:</Text> {quantidadeUsuarios}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chart: {
        marginTop: 20,
    },
    text: {
        marginTop: 15,
        fontSize: 13,
    },
});

export default Dashboard;
