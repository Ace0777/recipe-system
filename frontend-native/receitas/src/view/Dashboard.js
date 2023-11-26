import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text, Menu, Provider, Divider, Chip } from 'react-native-paper';
import { useUserContext } from '../auth/UserContext.js';
import { useNavigation } from '@react-navigation/native';
import Notification from '../util/Notificacao.js';
import axios from 'axios';

const Dashboard = () => {
    const notification = Notification();
    const navigation = useNavigation();
    const { user } = useUserContext();
    const apiUrl = "http://54.145.167.97/api";

    const buscaTodosIngredientes = async () => {
        let url = `${apiUrl}/ingrediente`;

        try {
            const response = await axios.get(url);
            setIngredientes(response.data.$values);
        } catch (error) {
            console.error('Falha na requisição:', error);
        }
    };

    useEffect(() => {
        if (user === undefined || user === null) {
            notification.show("Usuario não autenticado, realize o login.")
            navigation.navigate('Login');
            return;
        } else if(user.profile != 'ADM') {
            notification.show("Usuario não possui permissão.")
            navigation.navigate('Home');
            return;
        }
    }, []);

    return (
    <></>
    );
};

const styles = StyleSheet.create({
   
});

export default Dashboard;
