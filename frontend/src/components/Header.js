import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ loggedIn, onSignOut, currentEmail }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__container">
        {loggedIn ? (
          <>
            <p className="header__email">{currentEmail}</p>
            <button className="header__button" onClick={onSignOut}>
              Выйти
            </button>
          </>
        ) : location.pathname === "/sign-in" ? (
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        ) : (
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
