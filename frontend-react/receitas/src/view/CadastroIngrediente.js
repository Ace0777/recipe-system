import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CadastroReceita = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [novoIngrediente, setNovoIngrediente] = useState('');
  const [fotoReceita, setFotoReceita] = useState(null);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
  };

  const handleIngredienteChange = (e) => {
    setNovoIngrediente(e.target.value);
  };

  const handleAdicionarIngrediente = () => {
    if (novoIngrediente) {
      setIngredientes([...ingredientes, novoIngrediente]);
      setNovoIngrediente('');
    }
  };

  const handleFotoChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} foi enviado com sucesso.`);
      setFotoReceita(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} falhou ao enviar.`);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8}>
        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Cadastro de Receita</h2>
        <Form>
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

          <Form.Item label="Ingredientes">
            {ingredientes.map((ingrediente, index) => (
              <div key={index}>{ingrediente}</div>
            ))}
            <Input
              value={novoIngrediente}
              onChange={handleIngredienteChange}
            />
            <Button
              icon={<PlusOutlined />}
              type="default"
              onClick={handleAdicionarIngrediente}
              style={{ marginTop: '10px' }}
            >
              Adicionar Ingrediente
            </Button>
          </Form.Item>

          <Form.Item label="Foto da Receita">
            <Row gutter={16} align="middle">
              <Col span={12}>
                <Upload
                  name="fotoReceita"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleFotoChange}
                >
                  {fotoReceita ? (
                    <img
                      src={URL.createObjectURL(fotoReceita)}
                      alt="Foto da Receita"
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Fazer Upload</div>
                    </div>
                  )}
                </Upload>
              </Col>
              <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="primary" htmlType="submit" style={{ marginTop: '10px' }}>
                  Cadastrar Receita
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
