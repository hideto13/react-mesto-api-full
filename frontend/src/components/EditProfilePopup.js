import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_field_name"
        name="name"
        type="text"
        id="name"
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        autoComplete="off"
        onChange={handleNameChange}
        value={name || ""}
      />
      <span
        id="name-error"
        className="popup__error popup__error_field_name"
      ></span>
      <input
        className="popup__input popup__input_field_text"
        name="text"
        type="text"
        id="text"
        placeholder="Ваш род деятельности"
        required
        minLength="2"
        maxLength="200"
        autoComplete="off"
        onChange={handleDescriptionChange}
        value={description || ""}
      />
      <span
        id="text-error"
        className="popup__error popup__error_field_text"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
