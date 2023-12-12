import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import goBackIcon from '../../assets/icons/goBack.png';
import './MyProfile.css';
import { useAuth } from '../../contexts/AuthContext';
// React hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// yup
import * as yup from 'yup';

const schema = yup
    .object({
        newEmail: yup.string().email("Digite um email válido"),
        newNickname: yup.string(),
        newPassword: yup.string().min(4, "Mínimo de 4 caracteres"),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'As senhas devem ser iguais')
        .required('Campo Obrigatório'),
    })
    .required();

export default function MyProfile() {
    const [validate, setValidate] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const config = {
        headers: {
            Authorization: 'Bearer '.concat(sessionStorage.getItem('token')),
        },
    };

    useEffect(() => {
        async function valida() {
            try {
                const resposta = await axios.get(
                    'http://localhost:3000/profile',
                    config
                );
                console.log(resposta.status);
                if (resposta.status === 200) setValidate(true);
            } catch (error) {
                console.log(error);
                setValidate(false);
            }
        }
        valida();
    }, []);

    if (!validate) {
        return <p>Token Inválido, faça login!</p>;
    }

    const handleDeleteUser = async () => {
        try {
            console.log('context user is', user);
            const token = sessionStorage.getItem('token');
            const response = await axios.delete(
                'http://localhost:3000/profile',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Adiciona o token de autorização
                    },
                    data: user,
                }
            );

            alert(response.data); // Mensagem do servidor
            logout();
            navigate('/');
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);

            // Adicione este bloco para imprimir mais informações sobre o erro
            if (error.response) {
                // O servidor retornou um status diferente de 2xx
                console.error('Status do erro:', error.response.status);
                console.error('Dados do erro:', error.response.data);
            } else if (error.request) {
                // A solicitação foi feita, mas não recebeu resposta
                console.error('Erro de solicitação:', error.request);
            } else {
                // Algo aconteceu ao configurar a solicitação
                console.error(
                    'Erro ao configurar a solicitação:',
                    error.message
                );
            }

            // Trate o erro conforme necessário, como exibindo uma mensagem de erro amigável para o usuário
        }
    };

    const updateUser = async (data) => {
        try {
            console.log(user);
            const token = sessionStorage.getItem('token');
            const response = await axios.put('http://localhost:3000/profile', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Adiciona o token de autorização
                },
                userId: user.id,
                newEmail: data.newEmail,
                newNickname: data.newNickname,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            });
            alert(response.data);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <main className="main">
            <section className="myProfile">
                <div className="titleContainer">
                    <Link to="/game">
                        <img src={goBackIcon} id="goBackBtn" />
                    </Link>
                    <h1>Meu Perfil</h1>
                </div>
                <form
                    className="changeData"
                    autoComplete="custom-value"
                    onSubmit={handleSubmit(updateUser)}
                    noValidate
                >
                    <div className="field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Digite seu email..."
                            {...register('newEmail')}
                        />
                        <span className='error'>{errors?.newEmail?.message}</span>
                    </div>
                    <div className="field">
                        <label htmlFor="nickname">Nickname:</label>
                        <input
                            type="text"
                            id="nickname"
                            placeholder="Digite seu apelido..."
                            {...register('newNickname')}
                        />
                        <span className="error">{errors?.newNickname?.message}</span>
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Digite uma nova senha..."
                            {...register('newPassword')}
                        />
                        <span className="error">{errors?.newPassword?.message}</span>
                    </div>
                    <div className="field">
                        <label htmlFor="passwordConfirm">
                            Confirme sua senha:
                        </label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            placeholder="Digite sua senha novamente..."
                            {...register('confirmPassword')}
                        />
                        <span className="error">{errors?.confirmPassword?.message}</span>
                    </div>
                    <Button text="Alterar dados" type="submit" />
                </form>
                <div className="removeAccount">
                    <h2>Remova sua conta:</h2>
                    <FormField
                        label="Senha:"
                        htmlFor="deletePassword"
                        type="password"
                        placeholder="Digite sua senha para remover conta..."
                        autocomplete="current-password" // Adiciona o atributo autocomplete
                    />
                    <Button
                        text="Remover conta"
                        type="button"
                        func={handleDeleteUser}
                    />
                </div>
            </section>
        </main>
    );
}
