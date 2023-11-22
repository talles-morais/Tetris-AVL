import "./FormField.css"

export default function FormField({ htmlFor, type, placeholder, label }) {
    return (
        <div className="field">
            <label htmlFor={htmlFor}>{label}</label>
            <input type={type} id={htmlFor} placeholder={placeholder} />
        </div>
    );
}
