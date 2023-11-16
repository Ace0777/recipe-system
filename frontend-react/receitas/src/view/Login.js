import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../img/food_icon.png'
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = "http://54.145.167.97/api";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const onFinish = (values) => {
		console.log('Valores enviados:', values);

		logar(values)
	};

	async function logar(values) {
		const url = `${apiUrl}/usuario/login`;
		const data = {
			email: values.email,
			senha: values.senha,
		};

		try {
			const response = await axios.post(url, data);
			console.log('Requisição POST bem-sucedida');
			console.log('Resposta do servidor:', response.data);

			notification.success({
				message: 'Logado com sucesso!',
				description: 'Login verificado e finalizado.',
			});

			if (response.status === 200) {
				const userInfo = {
					id: response.data.id,
					nome: response.data.nome,
					email: response.data.email,
					profile: response.data.profile
				}

				localStorage.setItem('usuario', JSON.stringify(userInfo));
			}

			setTimeout(() => {

				window.location.href = '/principal';
			}, 2000);


		} catch (error) {
			notification.error({
				message: 'Erro, usuario não encontrado!',
				description: 'Usuario não encontrado, tente novamente.',
			});
			console.error('Falha na requisição:', error);
		}
	}

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
					name="senha"
					rules={[{ required: true, message: 'Por favor, insira sua senha!' }]
					}>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type={showPassword ? 'text' : 'password'}
						placeholder="Senha"
					/>
				</Form.Item>
				<Form.Item valuePropName="checked">
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
