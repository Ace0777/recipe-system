import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select, notification, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;

const apiUrl = "http://54.145.167.97/api";

const CadastroReceita = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ingredientesSelecionadosEdit, setIngredientesSelecionadosEdit] = useState([]);
  const [ingredientesSelecionadosInts, setIngredientesSelecionadosInts] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState({});

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuario'))

    if (user === undefined || user === null) {
      message.error(`Usuario não autenticado`);

      setTimeout(() => {

        window.location.href = '/login';
      }, 1500);

      return;
    }

    console.log(user)
    setUsuarioLogado(user)
  }, []);

  const buscaTodosIngredientes = async () => {
    let url = `${apiUrl}/ingrediente`;

    try {
      const response = await axios.get(url);
      setIngredientesSelecionadosEdit(response.data.$values);
    } catch (error) {
      console.error('Falha na requisição:', error);
    }
  };

  useEffect(() => {
    buscaTodosIngredientes();
  }, []);


  const handleChange = (values) => {
    setIngredientesSelecionadosInts(values)
    console.log(ingredientesSelecionadosInts)
  };


  const onFinish = async (values) => {
    console.log('Valores do formulário:', values);
    const url = `${apiUrl}/receita`;
    const data = {
      nome: nome,
      descricao: descricao,
      usuarioId: usuarioLogado.id,
      ingredientesIds: ingredientesSelecionadosInts
    };

    try {
      const response = await axios.post(url, data);
      console.log('Requisição POST bem-sucedida');
      console.log('Resposta do servidor:', response.data);


      notification.success({
        message: 'Cadastro realizado com sucesso!',
        description: 'Receita cadastrada com sucesso.',
      });


      setTimeout(() => {

        window.location.href = '/principal';
      }, 2000);

    } catch (error) {
      console.error('Falha na requisição:', error);
    }
  };



  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8}>
        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Cadastro de Receita</h2>
        <Form name="cadastro">
          <Form.Item label="Nome">
            <Input value={nome} onChange={handleNomeChange} />
          </Form.Item>

          <Form.Item label="Descrição">
            <Input.TextArea
              value={descricao}
              onChange={handleDescricaoChange}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>

          <Form.Item
            label="Ingredientes"
            

          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Selecione"
              onChange={handleChange}
            >
              {ingredientesSelecionadosEdit.map((ingrediente) => (
                <Option key={ingrediente.nome} value={ingrediente.id}>
                  {ingrediente.nome}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="">
            <Row gutter={16} align="middle">
              <Col span={12} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Button type="primary" onClick={onFinish} style={{ marginTop: '10px' }}>
                  Cadastrar Receita
                </Button>
                <Button type="primary" style={{ marginTop: "10px" }}>
                  <Link to="/principal">Voltar</Link>
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CadastroReceita;
