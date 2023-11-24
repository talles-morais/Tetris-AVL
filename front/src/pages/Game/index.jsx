import ProfileMenu from '../../components/ProfileMenu'
import Ranking from '../../components/Ranking'
import StatusDisplay from '../../components/StatusDisplay'
import tallesProfile from '../../assets/tallesProfile.jpg'
import RateGame from '../../components/RateGame'
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
            <StatusDisplay name="Score" data="50.000"/>
            <StatusDisplay name="Erros" data="2"/>
            <RateGame />
        </aside>
    </main>
  )
}
