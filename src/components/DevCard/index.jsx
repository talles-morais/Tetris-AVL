import SocialMediaIcon from '../SocialMediaIcon';
import instaIcon from '../../assets/icons/instaIcon.png';
import linkedinIcon from '../../assets/icons/linkedinIcon.png';
import githubIcon from '../../assets/icons/githubIcon.png';
import './DevCard.css';

export default function DevCard({
    photo,
    name,
    instagramURL,
    linkedinURL,
    githubURL,
}) {
    return (
        <div className="devCard">
            <img
                className="profilePic"
                src={photo}
                alt={`desenvolvedor ${name}`}
            />
            <legend>{name}</legend>
            <div className="icons">
                <SocialMediaIcon icon={instaIcon} link={instagramURL} />
                <SocialMediaIcon icon={linkedinIcon} link={linkedinURL} />
                <SocialMediaIcon icon={githubIcon} link={githubURL} />
            </div>
        </div>
    );
}
