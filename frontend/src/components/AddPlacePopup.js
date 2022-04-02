import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      title,
      link,
    });
  }

  React.useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_field_title"
        name="title"
        placeholder="Название"
        required
        type="text"
        id="title"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        onChange={handleTitleChange}
        value={title}
      />
      <span
        id="title-error"
        className="popup__error popup__error_field_title"
      ></span>
      <input
        className="popup__input popup__input_field_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        type="url"
        id="link"
        autoComplete="off"
        onChange={handleLinkChange}
        value={link}
      />
      <span
        id="link-error"
        className="popup__error popup__error_field_link"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
