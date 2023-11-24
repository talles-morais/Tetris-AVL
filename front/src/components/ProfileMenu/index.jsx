import { Link } from 'react-router-dom'
import "./ProfileMenu.css"

export default function ProfileMenu({ photo, nickname}) {
  return (
    <section className="profileMenu">
        <div className="avatar">
            <img src={photo} alt="" />
            <h1>{nickname}</h1>
        </div>
        <div className="menu">
          <Link to="/profile">
            <button id="myData">Meus dados</button>
          </Link>
          <Link to="/">
            <button id="logout">Sair da conta</button>
          </Link>
        </div>
    </section>
  )
}
