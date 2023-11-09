import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UserAddOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../img/food_icon.png';
import axios from 'axios';

const Cadastro = () => {

  const onFinish = (values) => {
    console.log('Valores do formulário:', values);
    const url = 'https://localhost:7007/api/usuario';
    const data = {
      name: values.nome,
      email: values.email,
      senha: values.senha,
    };

    axios.post(url, data)
      .then(response => {
        console.log('Requisição POST bem-sucedida');
        console.log('Resposta do servidor:', response.data);
      })
      .catch(error => {
        console.error('Falha na requisição:', error);
      });
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8}>
        <img src={logo} alt="Descrição da imagem" style={{ width: '100px', height: '100px', margin: '0 auto', display: 'block' }} />
        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Cadastro de Usuário </h2>
        <Form name="cadastro" onFinish={onFinish}>
          <Form.Item
            label="Nome"
            name="nome"
            rules={[
              {
                required: true,
                message: 'Por favor, insira seu nome!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Por favor, insira um email válido!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="senha"
            rules={[
              {
                required: true,
                message: 'Por favor, insira sua senha!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" style={{ width: '200px' }}>
              Cadastrar
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="default" style={{ width: '200px' }}>
              <Link to="/login">Voltar</Link> {/* Link para a página de login */}
            </Button>
          </Form.Item>

        </Form>
      </Col>
    </Row>
  );
};

export default Cadastro;
