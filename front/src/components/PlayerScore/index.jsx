import "./PlayerScore.css"

export default function PlayerScore({medal, name, score}) {
  return (
    <div className="player">
        <img src={medal} alt="medalha" />
        <div>
            <h2>{name}</h2>
            <p>{score}</p>
        </div>
    </div>
  )
}
