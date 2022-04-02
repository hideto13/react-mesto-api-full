import Popup from "./Popup";
import successImg from "../images/success.svg";
import unsuccessImg from "../images/unsuccess.svg";

function InfoTooltip({ isOpen, onClose, success }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name="info">
      <img
        src={success ? successImg : unsuccessImg}
        alt="success"
        className="popup__success"
      />
      <h2 className="popup__title popup__title_popup_info">
        {success
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."}
      </h2>
    </Popup>
  );
}

export default InfoTooltip;
