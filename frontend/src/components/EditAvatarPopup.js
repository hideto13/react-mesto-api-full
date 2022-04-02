import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarInputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonTitle="Соxранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarInputRef}
        className="popup__input popup__input_field_avatar"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        type="url"
        id="avatar"
        autoComplete="off"
      />
      <span
        id="avatar-error"
        className="popup__error popup__error_field_avatar"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
