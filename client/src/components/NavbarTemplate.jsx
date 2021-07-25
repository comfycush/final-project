import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
// import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function NavbarTemplate({ navbarData, isDeploy, templateData }) {
  // const isDeploy = useSelector((state) => state.template.isDeploy);
  const history = useHistory();

  function toUpdatePage() {
    history.push({
      pathname: "/update-template",
      state: {
        section: "navbar",
        data: navbarData,
        allData: templateData,
      },
    });
  }

  return (
    <div className="section-and-update">
      <nav
        className={
          navbarData.type === 1
            ? "type-1-nav"
            : navbarData.type === 2
            ? "type-2-nav"
            : "type-3-nav"
        }
        style={{
          backgroundColor: navbarData.backgroundColor,
          width: "100%",
          flexShrink: 0,
        }}
      >
        <div className="left-side">
          {navbarData.logo && <img src={navbarData.logo} alt="logo" />}
          {navbarData.companyName && (
            <h1 style={{ color: navbarData.companyNameColor }}>
              {navbarData.companyName}
            </h1>
          )}
        </div>
        <ul>
          {navbarData.navLinks.map((link, index) => (
            <li key={index}>
              <HashLink
                to={`#${link}`}
                style={{ color: navbarData.navlinksColor }}
              >
                {link}
              </HashLink>
            </li>
          ))}
        </ul>
        {navbarData.type === 2 && <div className="empty"></div>}
      </nav>
      {!isDeploy && (
        <div className="update-nav-section">
          <button onClick={toUpdatePage} className="btn btn-update-section">
            Update Navbar
          </button>
        </div>
      )}
    </div>
  );
}
