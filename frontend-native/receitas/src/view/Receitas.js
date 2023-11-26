import React, { useState, useEffect } from 'react';
import { View, ScrollView, Modal, Dimensions, SafeAreaView } from 'react-native';
import { Button, Card, Title, Paragraph, TextInput, Checkbox  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { useUserContext } from '../auth/UserContext.js';
import Notification from '../util/Notificacao.js';

const { width } = Dimensions.get('window');

const apiUrl = 'http://54.145.167.97/api';

const TelaPrincipal = () => {
    const [receitas, setReceitas] = useState([]);
    const [valorPesquisa, setValorPesquisa] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [receitaSelecionada, setReceitaSelecionada] = useState(null);
    const [ingredientesSelecionadosEdit, setIngredientesSelecionadosEdit] = useState([]);
    const [ingredientesSelecionadosInts, setIngredientesSelecionadosInts] = useState([]);
    const [nomeReceita, setNomeReceita] = useState('');
    const [descricaoReceita, setDescricaoReceita] = useState('');
    const { user, updateUser } = useUserContext();
    const notification = Notification();

    const buscaTodasReceitas = async () => {
        let url = `${apiUrl}/receita`;

        try {
            const response = await axios.get(url);
            setReceitas(response.data.$values);
        } catch (error) {
            console.error('Falha na requisição:', error);
        }
    };

    const buscaTodasReceitasNome = async (nome) => {
        let url = `${apiUrl}/receita/nome/${nome}`;

        if (nome === '') {
            url = `${apiUrl}/receita`;
        }

        try {
            const response = await axios.get(url);
            setReceitas(response.data.$values);
        } catch (error) {
            console.error('Falha na requisição:', error);
        }
    };

    const buscaTodosIngredientes = async () => {
        let url = `${apiUrl}/ingrediente`;

        try {
            const response = await axios.get(url);
            setIngredientesSelecionadosEdit(response.data.$values);
        } catch (error) {
            console.error('Falha na requisição:', error);
        }
    };

    const handleEditar = (receita) => {
        setReceitaSelecionada(receita);
        setNomeReceita(receita.nome);
        setDescricaoReceita(receita.descricao);
        setIngredientesSelecionadosInts(receita.ingredientes.$values.map((ingrediente) => ingrediente.id));
        buscaTodosIngredientes();
        setIsModalVisible(true);
    };

    const handleChange = (ingredienteId) => {
          const isSelected = ingredientesSelecionadosInts.includes(ingredienteId);

        
        if (isSelected) {
                setIngredientesSelecionadosInts(prevState => prevState.filter(id => id !== ingredienteId));
        } else {
                setIngredientesSelecionadosInts(prevState => [...prevState, ingredienteId]);
        }
    };

    const handleEditFormSubmit = async () => {
        try {
            const url = `${apiUrl}/receita/${receitaSelecionada.id}`;
            const data = {
                nome: nomeReceita,
                descricao: descricaoReceita,
                ingredientesIds: ingredientesSelecionadosInts,
            };

            await axios.put(url, data);
            setIsModalVisible(false);
            notification.show('Receita editada com sucesso!')
            buscaTodasReceitas();
        } catch (error) {
            notification.show('Erro ao editar a receita')
            console.error('Falha ao atualizar a receita:', error);
        }
    };

    useEffect(() => {
        if (user === undefined || user === null) {
            notification.show('Usuario não autenticado, realize o login.');
      
            setTimeout(() => {
              navigation.navigate('Login');
            }, 1500);
      
            return;
          }

        buscaTodasReceitas();
    }, []);

    const handleCurtir = async (id) => {
        try {
            const url = `${apiUrl}/receita/curtidas/${id}`;

            await axios.patch(url);
            notification.show('Receita curtida!')
            buscaTodasReceitas();
        } catch (error) {
            notification.show('Falha ao curtir a receita!')
            console.error('Falha ao curtir a receita:', error);
        }
    };

    const handleExcluir = async (id) => {
        try {
            const url = `${apiUrl}/receita/${id}`;

            await axios.delete(url);
            buscaTodasReceitas();
        } catch (error) {
            console.error('Falha ao excluir a receita:', error);
        }
    };

    const styles = {
        container: {
            flex: 1,
            padding: 20,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        button: {
            flex: 0.48,
        },
        searchBar: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        searchInput: {
            flex: 1,
            marginRight: 10,
        },
        recipeCard: {
            marginBottom: 20,
        },
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Title style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 35,
                    color: 'black',
                }}>Receitas da comunidade</Title>

                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="Pesquisar receitas..."
                        value={valorPesquisa}
                        onChangeText={(text) => setValorPesquisa(text)}
                        mode="outlined"
                        style={{ flex: 1, marginRight: 10 }}
                    />
                    <Button
                        icon={() => <Icon name="search1" size={24} />}
                        mode="contained"
                        onPress={() => buscaTodasReceitasNome(valorPesquisa)}
                    >
                        Pesquisar
                    </Button>
                </View>

                <ScrollView>
                    {receitas.map((receita, index) => (
                        <Card key={index} style={{ marginVertical: 10 }}>
                            <Card.Content>
                                <Title>{receita.nome}</Title>
                                <Paragraph>{receita.descricao}</Paragraph>
                            </Card.Content>
                            <Card.Actions style={{ justifyContent: 'space-between' }}>
                                <Button onPress={() => handleEditar(receita)} disabled={user.profile !== 'ADM' && user.id !== receita.usuarioId }>Editar</Button>
                                <Button onPress={() => handleCurtir(receita.id)}>{`Like ${receita.curtidas}`}</Button>
                                <Button onPress={() => handleExcluir(receita.id)} disabled={user.profile !== 'ADM' && user.id !== receita.usuarioId }>Excluir</Button>
                            </Card.Actions>
                        </Card>
                    ))}
                </ScrollView>

                <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)}>
                    <Card style={{ margin: 20, padding: 10 }}>
                        <Card.Content>
                            <Title>Editar Receita</Title>
                            <TextInput
                                label="Nome da Receita"
                                value={nomeReceita}
                                onChangeText={(text) => setNomeReceita(text)}
                                style={{ marginBottom: 10 }}
                            />
                            <TextInput
                                label="Descrição"
                                value={descricaoReceita}
                                onChangeText={(text) => setDescricaoReceita(text)}
                                style={{ marginBottom: 10 }}
                            />

                            <Title style={{ marginTop: 10 }}>Ingredientes:</Title>
                            <ScrollView style={{ maxHeight: 100, marginBottom: 10 }}>
                                {ingredientesSelecionadosEdit.map((ingrediente) => (
                                    <Checkbox.Item
                                        key={ingrediente.id}
                                        label={ingrediente.nome}
                                        status={
                                            ingredientesSelecionadosInts.includes(ingrediente.id)
                                                ? 'checked'
                                                : 'unchecked'
                                        }
                                        onPress={() => handleChange(ingrediente.id)}
                                    />
                                ))}
                            </ScrollView>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => setIsModalVisible(false)}>Fechar</Button>
                            <Button onPress={handleEditFormSubmit}>Salvar</Button>
                        </Card.Actions>
                    </Card>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default TelaPrincipal;
