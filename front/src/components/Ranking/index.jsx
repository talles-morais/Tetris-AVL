import PlayerScore from '../PlayerScore';
import goldMedal from '../../assets/icons/goldMedal.png';
import silverMedal from '../../assets/icons/silverMedal.png';
import copperMedal from '../../assets/icons/copperMedal.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Ranking.css';

export default function Ranking() {
    const [ranking, setRanking] = useState([{ nickname: '', score: 0 }]);

    useEffect(() => {
        async function getRanking() {
            try {
                const response = await axios.get(
                    'http://localhost:3000/ranking'
                );
                console.log(response.data);

                if (response.status === 200) {
                    const newRanking = response.data.map((item) => ({
                        nickname: item.nickname,
                        score: item.score,
                    }));

                    setRanking(newRanking);
                } else {
                    console.log('Unexpected status code:', response.status);
                }
            } catch (error) {
                console.log('Error:', error.message);
            }
        }

        getRanking();
    }, []);
    console.log(ranking);
    return (
        <section className="rankingFrame">
            <h1>Ranking</h1>
            <div className="classification">
                {ranking[0] && (
                    <PlayerScore
                        medal={goldMedal}
                        name={ranking[0].nickname}
                        score={ranking[0].score}
                    />
                )}
                {ranking[1] && (
                    <PlayerScore
                        medal={silverMedal}
                        name={ranking[1].nickname}
                        score={ranking[1].score}
                    />
                )}
                {ranking[2] && (
                    <PlayerScore
                        medal={copperMedal}
                        name={ranking[2].nickname}
                        score={ranking[2].score}
                    />
                )}
            </div>
        </section>
    );
}
