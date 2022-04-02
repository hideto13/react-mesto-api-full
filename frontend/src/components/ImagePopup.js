function ImagePopup({ name, link, onClose }) {
  return (
    <section className={`popup popup_photo ${link ? "popup_opened" : ""}`}>
      <figure className="popup__wrapper">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" alt={name} src={`${link}`} />
        <figcaption className="popup__description">{name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
