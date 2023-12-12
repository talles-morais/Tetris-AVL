import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProfileMenu from '../../components/ProfileMenu';
import Ranking from '../../components/Ranking';
import StatusDisplay from '../../components/StatusDisplay';
import userIcon from '../../assets/icons/userIcon.png';
import RateGame from '../../components/RateGame';
import { useAuth } from '../../contexts/AuthContext';
import Tetris from '../../components/Tetris';
import './Game.css';

export default function Game() {
    const [validate, setValidate] = useState(false);
    const { user, logout } = useAuth();

    const config = {
        headers: {
            Authorization: 'Bearer '.concat(sessionStorage.getItem('token')),
        },
    };

    useEffect(() => {
        async function valida() {
            try {
                const resposta = await axios.get(   
                    "http://localhost:3000/game",
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

    

    return (
        <main className="gameMain">
            <aside className="leftSide">
                <ProfileMenu photo={userIcon} nickname={user.nickname} logout={logout}/>
                <Ranking />
            </aside>
            <div className="gameFrame">
                <iframe
                    title="Projeto Vanilla"
                    src="../../../public/dist/index.html"
                    width="100%"
                    height="99%"
                    frameBorder="0"
                />
            </div>
            <aside className="rightSide">
                <StatusDisplay name="Score" data="50.000" />
                <StatusDisplay name="Linhas" data="2" />
                <RateGame />
            </aside>
        </main>
    );
}
