import "../styles/footer.css";
import { useSelector } from "react-redux";

export default function FooterTemplate({ footerData, navbarData }) {
  const isDeploy = useSelector((state) => state.template.isDeploy);

  if (!footerData.backgroundColor) {
    return null;
  }
  return (
    <div className="section-and-update">
      <div
        className={
          footerData.type === 1
            ? "type-1-footer"
            : footerData.type === 2
            ? "type-2-footer"
            : "type-3-footer"
        }
        style={{
          backgroundColor: footerData.backgroundColor,
          width: "100%",
          flexShrink: 0,
        }}
      >
        <div className="company-side">
          {navbarData.logo && <img src={navbarData.logo} alt="logo" />}
          {navbarData.companyName && (
            <h1 style={{ color: footerData.companyNameColor }}>
              {navbarData.companyName}
            </h1>
          )}
        </div>
        <div className="social-media-side">
          {footerData.facebook && (
            <a href={footerData.facebook} target="_blank" rel="noreferrer">
              {footerData.iconColor === "black" ? (
                <img
                  src="https://image.flaticon.com/icons/png/512/21/21155.png"
                  alt="facebook"
                />
              ) : (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/fb-white_cLtWbYUmt.png?updatedAt=1627039068045"
                  alt="facebook"
                />
              )}
            </a>
          )}
          {footerData.instagram && (
            <a href={footerData.instagram} target="_blank" rel="noreferrer">
              {footerData.iconColor === "black" ? (
                <img
                  src="https://image.flaticon.com/icons/png/512/1384/1384031.png"
                  alt="instagram"
                />
              ) : (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/ig-white_2Atkz47sP.png?updatedAt=1627039068060"
                  alt="instagram"
                />
              )}
            </a>
          )}
          {footerData.twitter && (
            <a href={footerData.twitter} target="_blank" rel="noreferrer">
              {footerData.iconColor === "black" ? (
                <img
                  src="https://image.flaticon.com/icons/png/512/733/733635.png"
                  alt="twitter"
                />
              ) : (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/twitter-whtie_PS54nQRRT.png?updatedAt=1627039068057"
                  alt="twitter"
                />
              )}
            </a>
          )}
          {footerData.linkedin && (
            <a href={footerData.linkedin} target="_blank" rel="noreferrer">
              {footerData.iconColor === "black" ? (
                <img
                  src="https://image.flaticon.com/icons/png/512/61/61109.png"
                  alt="linkedin"
                />
              ) : (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/linkedin-white_rThgoJIgK.png?updatedAt=1627039068357"
                  alt="linkedin"
                />
              )}
            </a>
          )}
          {footerData.youtube && (
            <a href={footerData.youtube} target="_blank" rel="noreferrer">
              {footerData.iconColor === "black" ? (
                <img
                  src="https://image.flaticon.com/icons/png/512/1384/1384028.png"
                  alt="youtube"
                />
              ) : (
                <img
                  src="https://ik.imagekit.io/vrvrzbdh5xfk/youtube-white_oXIiEpPbYw.png?updatedAt=1627039068087"
                  alt="youtube"
                />
              )}
            </a>
          )}
        </div>
      </div>
      {!isDeploy && (
        <div className="update-footer-section">
          <button className="btn btn-update-section">Update Footer</button>
        </div>
      )}
    </div>
  );
}
