export default function ModalImage({ image, height, width }) {
  console.log(image, height, width);
  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <img
        className="modal-content"
        src={image}
        alt="modal"
        style={{
          height: `${height}rem`,
          width: `${width}rem`,
          objectFit: "cover",
        }}
      />
    </div>
  );
}
