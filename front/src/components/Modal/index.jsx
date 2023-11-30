// React hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// yup
import * as yup from 'yup';

// axios
import axios from 'axios';

import Button from '../../components/Button';
import closeIcon from '../../assets/icons/closeIcon.png';
import './Modal.css';
import { useState } from 'react';

const schema = yup
    .object({
        email: yup.string().required('Campo obrigatório'),
        nickname: yup.string().required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
            .required('Campo Obrigatório'),
    })
    .required();

export default function Modal({ isOpen, toClose }) {
    const [validate, setValidate] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const submit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/create', data);
            setValidate(response.data);
            if(response.data.includes('criado'))
                <Navigate to='/'/>
        } catch (error) {
            setValidate(error.response.data);
        }   
        
    }

    if (isOpen) {
        return (
            <div className="modalRoot">
                <form onSubmit={handleSubmit(submit)} className="signUpForm">
                    <button
                        type="button"
                        className="closeModal"
                        onClick={toClose}
                    >
                        <img src={closeIcon} />
                    </button>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Digite seu email..."
                        {...register('email')}
                    />
                    <span className="error">{errors?.email?.message}</span>
                    <label htmlFor="nickname">Nickname:</label>
                    <input
                        type="text"
                        id="nickname"
                        placeholder="Digite seu apelido..."
                        {...register('nickname')}
                    />
                    <span className="error">{errors?.nickname?.message}</span>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite sua senha..."
                        {...register('password')}
                    />
                    <span className="error">{errors?.password?.message}</span>
                    <label htmlFor="passwordConfirm">Confirme sua senha:</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        placeholder="Digite sua senha novamente..."
                        {...register('confirmPassword')}
                    />
                    <span className="error">{errors?.confirmPassword?.message}</span>
                    <Button text="Cadastrar" type="submit" />
                </form>
            </div>
        );
    }
    return null;
}
