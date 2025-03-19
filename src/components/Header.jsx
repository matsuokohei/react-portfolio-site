import CoverImage from '../images/cover-image.webp'
import ProfileImage from '../images/profile-image.webp'
import {FaTwitter, FaGithub} from 'react-icons/fa'

export const Header = () => {
  return (
    <header className="main-cover" style={{backgroundImage: `url(${CoverImage})`}}>
      <div className="overlay"></div>
      <div className="container">
        <div className="display-table">
          <div className="display-table-contents">
            <div className="profile-thumb" style={{backgroundImage: `url(${ProfileImage})`}}></div>
            <h1 className="title-text">テスト次郎</h1>
            <h3 className="title-text">自称技術者</h3>
            <ul className="social-icons">
              <li className="icon-link">
                <a href="https://x.com/">
                  <FaTwitter color="white" size="2rem" />
                </a>
              </li>
              <li className="icon-link">
                <a href="https://github.com/">
                  <FaGithub color="white" size="2rem" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

