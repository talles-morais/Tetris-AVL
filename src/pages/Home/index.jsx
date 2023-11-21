import { useState } from 'react';
import Letter from '../../components/Letter';
import tallesProfile from '../../assets/tallesProfile.jpg';
import muriloProfile from '../../assets/muriloProfile.png';
import DevCard from '../../components/DevCard';
import Button from '../../components/Button';
import './Home.css';
import Modal from '../../components/Modal';

export default function Home() {
    const [openModal, setOpenModal] = useState(false);

    function register() {
        console.log('funfou');
        setOpenModal(true);
    }

    const tallesLinks = {
        instagram: 'https://www.instagram.com/t.alves02/',
        linkedin: 'https://www.linkedin.com/in/t-alvesdm/',
        github: 'https://github.com/Tsplay25',
    };

    const muriloLinks = {
        instagram: 'https://www.instagram.com/murilo_zaina/',
        linkedin: 'https://www.linkedin.com/in/murilo-martinez-zaina-b9537629a/',
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
                                instagramURL={tallesLinks.instagram}
                                linkedinURL={tallesLinks.linkedin}
                            />
                        </div>
                    </div>
                </section>
                <section className="loginFrame">
                    <div className="signUp">
                        <h2>Cadastre-se:</h2>
                        <Button
                            text="Cadastrar"
                            func={register}
                        />
                        <Modal isOpen={openModal} toClose={() => setOpenModal(!openModal)}/>
                    </div>
                    <div className="signIn">
                        <h2>Ou faça login:</h2>
                        <form action="" className="signInForm">
                            <label htmlFor="nickname">Nickname:</label>
                            <input
                                type="text"
                                id="nickname"
                                placeholder="Digite seu apelido..."
                            />
                            <label htmlFor="password">Senha:</label>
                            <input
                                type="text"
                                id="password"
                                placeholder="Digite sua senha..."
                            />
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
