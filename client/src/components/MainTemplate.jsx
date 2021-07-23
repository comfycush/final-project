import "../styles/main.css";

export default function Main({ mainData }) {
  return (
    <main
      className={
        mainData.type === 1
          ? "type-1-main"
          : mainData.type === 2
          ? "type-2-main"
          : "type-3-main"
      }
      style={{ backgroundColor: mainData.backgroundColor }}
    >
      <img src={mainData.image} alt="main" />
      <div className="text-main-section">
        <h1 style={{ color: mainData.headlineColor }}>{mainData.headline}</h1>
        <p style={{ color: mainData.subHeadlineColor }}>
          {mainData.subHeadline}
        </p>
      </div>
    </main>
  );
}
