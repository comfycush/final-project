import "../styles/about.css";
import { useSelector } from "react-redux";

export default function AboutTemplate({ aboutData }) {
  const isDeploy = useSelector((state) => state.template.isDeploy);

  if (!aboutData.type) {
    return null;
  }

  return (
    <div className="section-and-update">
      <div
        id="About"
        className={
          aboutData.type === 1
            ? "type-1-about"
            : aboutData.type === 2
            ? "type-2-about"
            : "type-3-about"
        }
        style={{
          backgroundColor: aboutData.backgroundColor,
          width: "100%",
          flexShrink: 0,
        }}
      >
        <img src={aboutData.image} alt="about" />
        <div className="text-about-section">
          <h1 style={{ color: aboutData.headlineColor }}>
            {aboutData.headline}
          </h1>
          <p>{aboutData.paragraph}</p>
        </div>
      </div>
      {!isDeploy && (
        <div className="update-about-section">
          <button className="btn btn-update-section">Update About</button>
        </div>
      )}
    </div>
  );
}
