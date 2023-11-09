import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, InputNumber } from 'antd';
import { Link } from 'react-router-dom';

const CadastroIngrediente = ({ onIngredienteSubmit }) => {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(1); // Valor padrão de 1

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleQuantidadeChange = (value) => {
    setQuantidade(value);
  };

  const handleAdicionarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const handleDiminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const handleLimparCampos = () => {
    setNome('');
    setQuantidade(1);
  };

  const handleSubmit = () => {
    if (nome && quantidade) {
      const novoIngrediente = {
        nome,
        quantidade,
      };
      onIngredienteSubmit(novoIngrediente);
      handleLimparCampos(); // Limpa os campos após o envio
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Cadastro de Ingredientes</h2>
        <Form>
          <Form.Item label="Nome do Ingrediente">
            <Input value={nome} onChange={handleNomeChange} />
          </Form.Item>
          <Form.Item label="Quantidade">
            <Input.Group compact>
              <InputNumber
                value={quantidade}
                onChange={handleQuantidadeChange}
                min={1}
              />
              <Button onClick={handleAdicionarQuantidade}>Adicionar</Button>
              <Button onClick={handleDiminuirQuantidade}>Diminuir</Button>
            </Input.Group>
          </Form.Item>
          <Form.Item style={{ alignContent: 'center' }}>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <Button type="primary" onClick={handleSubmit} style={{ marginRight: 10 }}>
                Cadastrar Ingrediente
              </Button>
              <Button type="default" onClick={handleLimparCampos}>
                Limpar Campos
              </Button>
              <Button type="primary" style={{marginLeft: "10px"}}>
              <Link to="/principal">Voltar</Link>
              </Button>
            </div>

          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CadastroIngrediente;
