import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../img/food_icon.png'
import { Link } from 'react-router-dom';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const onFinish = (values) => {
		console.log('Valores enviados:', values);
	};

	const mostrarSenha = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

			<Form
				name="login-form"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				style={{ maxWidth: '300px' }}
			>
				<img src={logo} alt="Descrição da imagem" style={{ width: '100px', height: '100px', margin: '0 auto', display: 'block' }} />
				<p style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', fontSize: '16px' }}>
					Para acessar a plataforma de receitas, faça o login preenchendo os campos
				</p>
				<Form.Item
					name="email"
					rules={[{ required: true, message: 'Por favor, insira seu email!' }]
					}>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Endereço de e-mail"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Por favor, insira sua senha!' }]
					}>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type={showPassword ? 'text' : 'password'}
						placeholder="Senha"
					/>
				</Form.Item>
				<Form.Item name="showpass" valuePropName="checked">
					<Checkbox onClick={mostrarSenha}>Exibir senha</Checkbox>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
						Entrar
					</Button>
				</Form.Item>
				<Form.Item>
					<Button type="default" style={{ width: '100%' }}>
						<Link to="/cadastro">Cadastrar</Link>
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
