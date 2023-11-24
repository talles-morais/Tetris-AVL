import Button from '../../components/Button';
import closeIcon from '../../assets/icons/closeIcon.png';
import './Modal.css';

export default function Modal({ isOpen, toClose }) {

    if (isOpen) {
        return (
            <div className="modalRoot">
                    <form action="" className="signUpForm">
                        <button type="button" className="closeModal" onClick={toClose}>
                            <img src={closeIcon} />
                        </button>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Digite seu email..."
                        />
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
                        <label htmlFor="passwordConfirm">
                            Confirme sua senha:
                        </label>
                        <input
                            type="text"
                            id="passwordConfirm"
                            placeholder="Digite sua senha novamente..."
                        />
                        <Button text="Cadastrar" type="submit" />
                    </form>
            </div>
        );
    }
    return null;
}
