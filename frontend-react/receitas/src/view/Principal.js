import React from 'react';
import { Input, Button, Row, Col, Card, Space, Typography, message, Affix } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, LikeOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TelaPrincipal = () => {

  async function buscaTodasReceitas() {

    const url = 'https://localhost:7007/api/receita';

    try {
      const response = await axios.get(url,);
      console.log('Requisição GET bem-sucedida');
      console.log('Resposta do servidor:', response.data.$values);
      
      setReceitas(response.data.$values);

    } catch (error) {
      console.error('Falha na requisição:', error);
    }
  }

  async function buscaTodasReceitasNome(nome) {

    let url = `https://localhost:7007/api/receita/nome/${nome}`;
    
    if (nome == '') {
      url = `https://localhost:7007/api/receita`
    }

    try {
      const response = await axios.get(url,);
      console.log('Nome passado: ', nome)
      console.log('Requisição GET bem-sucedida');
      console.log('Resposta do servidor:', response.data.$values);
      
      setReceitas(response.data.$values);

    } catch (error) {
      console.error('Falha na requisição:', error);
    }
  }

  React.useEffect(() => {
    buscaTodasReceitas();
  }, []);
  // Exemplo de dados de receitas
  const [receitas, setReceitas] = React.useState([]);
  const [valorPesquisa, setValorPesquisa] = React.useState('');

  const handleEditar = (nome) => {
    message.info(`Editar ${nome}`);
  };

  const handleCurtir = (nome) => {
    message.success(`Curtir ${nome}`);
  };

  const handleExcluir = (nome) => {
    message.error(`Excluir ${nome}`);
  };

  const handleInputChange = (event) => {
    const novoValor = event.target.value;
    setValorPesquisa(novoValor);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Affix offsetTop={20} style={{ position: 'absolute', left: 20, top: 20 }}>
        <Button type="default" icon={<BookOutlined />}>
          Minhas Receitas
        </Button>
      </Affix>
      <Row justify="end" gutter={16}>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/CadastroIngrediente">Cadastrar Ingrediente</Link>
          </Button>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/CadastroReceita">Cadastrar Receita</Link>
          </Button>
        </Col>
      </Row>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Receitas da comunidade
      </Typography.Title>
      <Row justify="center" style={{ marginTop: '40px' }}>
        <Col span={12}>
          <Input
            placeholder="Pesquisar receitas..."
            size="large"
            value={valorPesquisa}
            onChange={handleInputChange}
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" icon={<SearchOutlined />} size="large" style={{ marginLeft: '10px' }} onClick={() => buscaTodasReceitasNome(valorPesquisa)}>
            Pesquisar
          </Button>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        {receitas.map((receita, index) => (
          <Col span={6} key={index}>
            <Card>
              <Typography.Title level={3} style={{ marginTop: '10px' }}>
                {receita.nome}
              </Typography.Title>
              <Typography.Paragraph level={3} style={{ marginTop: '10px' }}>
                {receita.descricao}
              </Typography.Paragraph>
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
                  {' ' + receita.curtidas} 
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
