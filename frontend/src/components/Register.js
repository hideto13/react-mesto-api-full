import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({
      email,
      password,
    });
  }

  React.useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <div className="form__container">
      <h2 className="form__title">Регистрация</h2>
      <form className="popup__form" onSubmit={handleSubmit}>
        <input
          className="popup__input  popup__input_theme_dark"
          name="name"
          type="email"
          id="name"
          placeholder="Email"
          required
          minLength="2"
          maxLength="50"
          autoComplete="off"
          onChange={handleEmailChange}
          value={email || ""}
        />
        <span
          id="name-error"
          className="popup__error popup__error_field_name"
        ></span>
        <input
          className="popup__input popup__input_theme_dark"
          name="text"
          type="password"
          id="text"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="50"
          autoComplete="off"
          onChange={handlePasswordChange}
          value={password || ""}
        />
        <span
          id="text-error"
          className="popup__error popup__error_field_text"
        ></span>
        <button
          className="popup__submit-button popup__submit-button_theme_dark"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="form__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
