import React from 'react';
import { Input, Button, Row, Col, Card, Space, Typography, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import logo from '../img/food_icon.png';

const TelaPrincipal = () => {
  // Exemplo de dados de receitas
  const receitas = [
    { nome: 'Biscoito', imagem: logo },
    { nome: 'Biscoito', imagem: logo },
    { nome: 'Biscoito', imagem: logo },
    { nome: 'Biscoito', imagem: logo },
    
  ];

  const handleEditar = (nome) => {
    message.info(`Editar ${nome}`);
  };

  const handleCurtir = (nome) => {
    message.success(`Curtir ${nome}`);
  };

  const handleExcluir = (nome) => {
    message.error(`Excluir ${nome}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row justify="end" gutter={16}>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            Cadastrar Receita
          </Button>
        </Col>
      </Row>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Receitas do Zezin
      </Typography.Title>
      <Row justify="center" style={{ marginTop: '40px' }}>
        <Col span={12}>
          <Input
            placeholder="Pesquisar receitas..."
            size="large"
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" icon={<SearchOutlined />} size="large" style={{ marginLeft: '10px' }}>
            Pesquisar
          </Button>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        {receitas.map((receita, index) => (
          <Col span={6} key={index}>
            <Card>
              <img
                src={receita.imagem}
                alt={receita.nome}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <Typography.Title level={3} style={{ marginTop: '10px' }}>
                {receita.nome}
              </Typography.Title>
              <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  onClick={() => handleEditar(receita.nome)}
                >
                  Editar
                </Button>
                <Button
                  type="default"
                  icon={<LikeOutlined />}
                  onClick={() => handleCurtir(receita.nome)}
                >
                  Curtir
                </Button>
                <Button
                  type="default"
                  icon={<DeleteOutlined />}
                  onClick={() => handleExcluir(receita.nome)}
                >
                  Excluir
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TelaPrincipal;