import { useState } from 'react';

// react-router-dom
import { Navigate } from 'react-router-dom';

// React hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// yup
import * as yup from 'yup';

// axios
import axios from 'axios';

import Letter from '../../components/Letter';
import tallesProfile from '../../assets/tallesProfile.jpg';
import muriloProfile from '../../assets/muriloProfile.png';
import DevCard from '../../components/DevCard';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import './Home.css';
import { useAuth } from '../../contexts/AuthContext';

const schema = yup
    .object({
        nickname: yup.string().required('Campo obrigatório'),
        password: yup.string().min(4, "Mínimo de 4 caracteres").required('Campo obrigatório'),
    })
    .required();

export default function Home() {
    const { login } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [validate, setValidate] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const submit = async (data) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/login',
                data
            );
            login(response.data.user);
            const token = response.data.token;
            sessionStorage.setItem('token', token);
            if (token) setValidate('Validado');
        } catch (error) {
            setValidate(error.response.data);
        }
    };

    if (validate.toLowerCase().includes('validado')) {
        return <Navigate to="/game" />;
    }

    function signUp() {
        setOpenModal(true);
    }

    const tallesLinks = {
        instagram: 'https://www.instagram.com/t.alves02/',
        linkedin: 'https://www.linkedin.com/in/t-alvesdm/',
        github: 'https://github.com/Tsplay25',
    };

    const muriloLinks = {
        instagram: 'https://www.instagram.com/murilo_zaina/',
        linkedin:
            'https://www.linkedin.com/in/murilo-martinez-zaina-b9537629a/',
    };

    

    return (
        <main className="main">
            <section className="mainContent">
                <section className="presentation">
                    <h1 className="title">
                        <Letter text="T" color="B02D2D" />
                        <Letter text="E" color="D27F00" />
                        <Letter text="T" color="F9D313" />
                        <Letter text="R" color="00C955" />
                        <Letter text="I" color="3477DC" />
                        <Letter text="S" color="8E0E9B" />
                        <Letter text=" AVL" color="FFF" />
                    </h1>
                    <h2 className="subtitle">Bem vindo ao jogo!</h2>
                    <div className="description">
                        <p>
                            Projeto desenvolvido para a disciplina XDES03 -
                            Desenvolvimento Web.
                        </p>
                        <p>Conheça os desenvolvedores:</p>
                        <div className="devs">
                            <DevCard
                                photo={tallesProfile}
                                name="Talles Alves"
                                instagramURL={tallesLinks.instagram}
                                linkedinURL={tallesLinks.linkedin}
                                githubURL={tallesLinks.github}
                            />
                            <DevCard
                                photo={muriloProfile}
                                name="Murilo Zaina"
                                instagramURL={muriloLinks.instagram}
                                linkedinURL={muriloLinks.linkedin}
                            />
                        </div>
                    </div>
                </section>
                <section className="loginFrame">
                    <div className="signUp">
                        <h2>Cadastre-se:</h2>
                        <Button text="Cadastrar" func={signUp} />
                        <Modal
                            isOpen={openModal}
                            toClose={() => setOpenModal(!openModal)}
                        />
                    </div>
                    <div className="signIn">
                        <h2>Ou faça login:</h2>
                        <form
                            className="signInForm"
                            onSubmit={handleSubmit(submit)}
                            noValidate
                        >
                            <label htmlFor="nickname">Nickname:</label>
                            <input
                                type="text"
                                id="nickname"
                                placeholder="Digite seu apelido..."
                                {...register('nickname')}
                            />
                            <span className="error">
                                {errors?.nickname?.message}
                            </span>
                            <label htmlFor="password">Senha:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Digite sua senha..."
                                {...register('password')}
                            />
                            <span className="error">
                                {errors?.password?.message}
                            </span>
                            <a href="" id="forgotPassword">
                                Esqueci minha senha
                            </a>

                            <Button text="Entrar" type="submit" />
                        </form>
                    </div>
                </section>
            </section>
        </main>
    );
}
