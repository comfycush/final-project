import "../styles/about.css";

export default function AboutTemplate({ aboutData }) {
  return (
    <div
      id="About"
      className={
        aboutData.type === 1
          ? "type-1-about"
          : aboutData.type === 2
          ? "type-2-about"
          : "type-3-about"
      }
      style={{ backgroundColor: aboutData.backgroundColor }}
    >
      <img src={aboutData.image} alt="about" />
      <div className="text-about-section">
        <h1 style={{ color: aboutData.headlineColor }}>{aboutData.headline}</h1>
        <p>{aboutData.paragraph}</p>
      </div>
    </div>
  );
}
