import ProfileMenu from '../../components/ProfileMenu'
import Ranking from '../../components/Ranking'
import tallesProfile from '../../assets/tallesProfile.jpg'
import "./Game.css"

export default function Game() {
  return (
    <main className="gameMain">
        <aside className="leftSide">
            <ProfileMenu photo={tallesProfile} nickname="Talles"/>
            <Ranking />
        </aside>
        <div className="gameFrame">
        </div>
        <aside className="rightSide">
        </aside>
    </main>
  )
}
