export default function SocialMediaIcon({ icon, link }) {
    return (
        <a href={link}>
            <img src={icon}/>
        </a>
    )
}
