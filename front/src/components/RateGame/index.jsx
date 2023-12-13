import star from '../../assets/icons/star.png';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import './RateGame.css';

export default function RateGame() {
    const [rating, setRating] = useState(null);
    const { user } = useAuth();

    const handleStarClick = async (selectedRating) => {
        setRating(selectedRating);
        try {
            const response = await axios.put('http://localhost:3000/rate', {
                userId: user.id,
                rating: selectedRating,
            });

            console.log('Avaliação selecionada:', selectedRating);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="rateGame">
            <h1>Avalie o jogo:</h1>
            {/* <div className="stars">
                <button>
                    <img src={star} />
                </button>
                <button>
                    <img src={star} />
                </button>
                <button>
                    <img src={star} />
                </button>
                <button>
                    <img src={star} />
                </button>
                <button>
                    <img src={star} />
                </button>
            </div> */}
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={star <= rating ? 'star active' : 'star'}
                    onClick={() => handleStarClick(star)}
                >
                    ★
                </span>
            ))}
        </section>
    );
}
