import "../styles/navbar.css";

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
            <a href={`#${link}`} style={{ color: navbarData.navLinksColor }}>
              {link}
            </a>
          </li>
        ))}
      </ul>
      {navbarData.type === 2 && <div className="empty"></div>}
    </nav>
  );
}
