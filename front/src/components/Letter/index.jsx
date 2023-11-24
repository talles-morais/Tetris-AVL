export default function Letter({ text, color }) {
    return <span style={{ color: `#${color}` }}>{text}</span>;
}
