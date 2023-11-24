import './Button.css';

export default function Button({ text, type, func }) {

    return (
        <button
            onClick={func}
            className="generalButton"
            type={type}
        >
            {text}
        </button>
    );
}
