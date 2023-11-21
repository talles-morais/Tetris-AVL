import "./Button.css"

export default function Button({ text, type, color }) {
    return (
        <button className="generalButton" type={type}>{text}</button>
    )
}
