import Button from '../../components/Button';
import FormField from '../../components/FormField';
import './MyProfile.css';

export default function MyProfile() {
    return (
        <main className="main">
            <section className="myProfile">
                <h1>Meu Perfil</h1>
                <form action="" className="changeData">
                    <FormField label="Email:" htmlFor="email" type="text" placeholder="Digite seu email..."/>
                    <FormField label="Nickname:" htmlFor="nickname" type="text" placeholder="Digite seu apelido..."/>
                    <FormField label="Senha:" htmlFor="password" type="text" placeholder="Digite uma nova senha..."/>
                    <FormField label="Confirme sua senha:" htmlFor="passwordConfirm" type="text" placeholder="Digite sua senha novamente..."/>

                    <Button text="Alterar dados" type="submit" />
                </form>
                <div className="removeAccount">
                    <h2>Remova sua conta:</h2>
                    <Button text="Remover conta" type="button" />
                </div>
            </section>
        </main>
    );
}