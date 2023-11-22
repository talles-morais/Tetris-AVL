import "./ProfileMenu.css"

export default function ProfileMenu({ photo, nickname}) {
  return (
    <section className="profileMenu">
        <div className="avatar">
            <img src={photo} alt="" />
            <h1>{nickname}</h1>
        </div>
        <div className="menu">
            <button id="myData">Meus dados</button>
            <button id="logout">Sair da conta</button>
        </div>
    </section>
  )
}
