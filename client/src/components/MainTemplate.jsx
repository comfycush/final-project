import "../styles/main.css";

export default function Main({ mainData }) {
  return (
    <main
      className="type-1-main"
      style={{ backgroundColor: mainData.backgroundColor }}
    >
      <img src={mainData.image} alt="main" />
      <div className="text-main-section">
        <h1 style={{ color: mainData.headlineColor }}>{mainData.headline}</h1>
        <h2>{mainData.subHeadline}</h2>
      </div>
    </main>
  );
}
