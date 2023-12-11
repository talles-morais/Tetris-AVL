import { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import goBackIcon from '../../assets/icons/goBack.png';
import './MyProfile.css';
import { useAuth } from '../../contexts/AuthContext';

export default function MyProfile() {
    const [validate, setValidate] = useState(false);
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: 'Bearer '.concat(sessionStorage.getItem('token')),
        },
    };

    useEffect(() => {
        async function valida() {
            try {
                const resposta = await axios.get(
                    "http://localhost:3000/profile",
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

    if(!validate){
        return <p>Token Inválido, faça login!</p>
    }

const handleDeleteUser = async () => {
    try {
        console.log("context user is", user)
        const token = sessionStorage.getItem('token')
        const response = await axios.delete("http://localhost:3000/profile", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Adiciona o token de autorização
            },
            data : user
        });

        alert(response.data); // Mensagem do servidor
        logout()
        navigate("/")
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
            console.error('Erro ao configurar a solicitação:', error.message);
        }

        // Trate o erro conforme necessário, como exibindo uma mensagem de erro amigável para o usuário
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
                <form action="" className="changeData" autoComplete="custom-value">
                    <FormField
                        label="Email:"
                        htmlFor="email"
                        type="text"
                        placeholder="Digite seu email..."
                        autocomplete="email"
                    />
                    <FormField
                        label="Nickname:"
                        htmlFor="nickname"
                        type="text"
                        placeholder="Digite seu apelido..."
                        autocomplete="nickname"
                    />
                    <FormField
                        label="Senha:"
                        htmlFor="password"
                        type="password"
                        placeholder="Digite uma nova senha..."
                        autoComplete="current-password"
                    />
                    <FormField
                        label="Confirme sua senha:"
                        htmlFor="passwordConfirm"
                        type="password"
                        placeholder="Digite sua senha novamente..."
                        autoComplete="current-password"
                    />

                    <Button text="Alterar dados" type="submit" />
                </form>
                <div className="removeAccount">
                    <h2>Remova sua conta:</h2>
                    <FormField
                        label="Senha:"
                        htmlFor="deletePassword"
                        type="password"
                        placeholder="Digite sua senha para confirmar a remoção da conta..."
                        autocomplete="current-password" // Adiciona o atributo autocomplete
                    />
                    <Button text="Remover conta" type="button" func={handleDeleteUser}/>
                </div>
            </section>
        </main>
    );
}
