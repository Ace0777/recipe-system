import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UserAddOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../img/food_icon.png';

const Cadastro = () => {
  const onFinish = (values) => {
    console.log('Valores do formulário:', values);
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
            label="Login"
            name="login"
            rules={[
              {
                required: true,
                message: 'Por favor, insira seu login!',
              },
            ]}
          >
            <Input prefix={<UserAddOutlined />} style={{ width: '100%' }} />
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
        </Form>
      </Col>
    </Row>
  );
};

export default Cadastro;
