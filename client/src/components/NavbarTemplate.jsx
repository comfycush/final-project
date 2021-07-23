import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";

export default function NavbarTemplate({ navbarData }) {
  return (
    <nav
      className={
        navbarData.type === 1
          ? "type-1-nav"
          : navbarData.type === 2
          ? "type-2-nav"
          : "type-3-nav"
      }
      style={{ backgroundColor: navbarData.backgroundColor }}
    >
      <div className="left-side">
        <img src={navbarData.logo} alt="logo" />
        <h1 style={{ color: navbarData.companyNameColor }}>
          {navbarData.companyName}
        </h1>
      </div>
      <ul>
        {navbarData.navLinks.map((link, index) => (
          <li key={index}>
            <HashLink
              to={`#${link}`}
              style={{ color: navbarData.navLinksColor }}
            >
              {link}
            </HashLink>
          </li>
        ))}
      </ul>
      {navbarData.type === 2 && <div className="empty"></div>}
    </nav>
  );
}
