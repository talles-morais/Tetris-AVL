import PlayerScore from '../PlayerScore';
import goldMedal from '../../assets/icons/goldMedal.png';
import silverMedal from '../../assets/icons/silverMedal.png';
import copperMedal from '../../assets/icons/copperMedal.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Ranking.css';

export default function Ranking() {
    const [ranking, setRanking] = useState({nick: "---", score: 0});

    useEffect(() => {
        async function getRanking() {
            try {
                const response = await axios.get('http://localhost:3000/ranking');
                console.log(response);
                
                if (response.status === 200) {
                    setRanking({ nick: response.data[0].nickname, score: response.data[0].score });
                } else {
                    console.log('Unexpected status code:', response.status);
                }
            } catch (error) {
                console.log('Error:', error.message);
            }
        }
        
        getRanking();
    }, []);
    return (
        <section className="rankingFrame">
            <h1>Ranking</h1>
            <div className="classification">
                <PlayerScore medal={goldMedal} name={ranking.nick} score={ranking.score} />
                <PlayerScore
                    medal={silverMedal}
                    name="Cleyson"
                    score="51.000"
                />
                <PlayerScore medal={copperMedal} name="Arlete" score="42.000" />
            </div>
        </section>
    );
}
