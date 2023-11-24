import PlayerScore from "../PlayerScore";
import goldMedal from "../../assets/icons/goldMedal.png"
import silverMedal from "../../assets/icons/silverMedal.png"
import copperMedal from "../../assets/icons/copperMedal.png"
import "./Ranking.css"

export default function Ranking() {
  return (
    <section className="rankingFrame">
        <h1>Ranking</h1>
        <div className="classification">
            <PlayerScore medal={goldMedal} name="Neuza" score="54.000"/>
            <PlayerScore medal={silverMedal} name="Cleyson" score="51.000"/>
            <PlayerScore medal={copperMedal} name="Arlete" score="42.000"/>
        </div>
    </section>
  )
}
