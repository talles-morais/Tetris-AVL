// React hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// yup
import * as yup from 'yup';
import "./FormField.css"

const schema = yup
    .object({
        nickname: yup.string().required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório'),
    })
    .required();

export default function FormField({ htmlFor, type, placeholder, label, reg}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    return (
        <div className="field">
            <label htmlFor={htmlFor}>{label}</label>
            <input type={type} id={htmlFor} placeholder={placeholder} />
        </div>
    );
}
