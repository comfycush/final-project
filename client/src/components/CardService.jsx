export default function CardService({
  type,
  bgCol,
  image,
  title,
  titleCol,
  text,
  textCol,
}) {
  return (
    <div className="card-service" style={{ backgroundColor: bgCol }}>
      {type === 1 || type === 3 ? (
        <>
          {image && <img src={image} alt="icon" />}
          {title && <h1 style={{ color: titleCol }}>{title}</h1>}
          {text && <p style={{ color: textCol }}>{text}</p>}
        </>
      ) : (
        <>
          <div className="text-card-service">
            {title && <h1 style={{ color: titleCol }}>{title}</h1>}
            {text && <p style={{ color: textCol }}>{text}</p>}
          </div>
          {image && <img src={image} alt="icon" />}
        </>
      )}
    </div>
  );
}
