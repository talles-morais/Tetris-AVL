import star from "../../assets/icons/star.png"
import './RateGame.css';

export default function RateGame() {
    return (
        <section className="rateGame">
            <h1>Avalie o jogo:</h1>
            <div className="stars">
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
            </div>
        </section>
    );
}
