import React from "react";
import Popup from "./Popup";

function PopupWithForm({
  title,
  name,
  buttonTitle,
  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <h2 className={`popup__title popup__title_popup_${name}`}>{title}</h2>
      <form className="popup__form" name={`${name}-form`} onSubmit={onSubmit}>
        {children}
        <button className="popup__submit-button" type="submit">
          {buttonTitle}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
