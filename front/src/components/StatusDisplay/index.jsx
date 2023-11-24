import "./StatusDisplay.css"

export default function StatusDisplay({name, data}) {
  return (
    <div className="statusFrame">
        <h1>{name}</h1>
        <div className="data">
            <p>{data}</p>
        </div>
    </div>
  )
}
