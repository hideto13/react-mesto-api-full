import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { Api } from "../utils/api";
import { register, authorize, checkToken } from "../utils/authApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { BASE_URL } from '../utils/constants';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [infoPopupOpen, setInfoPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  const [api, setApi] = React.useState();

  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt)
        .then((res) => {
          if (res) {
            addApi(jwt)
            setLoggedIn(true);
            setCurrentEmail(res.email);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function addApi(jwt) {
    setApi(new Api({
      baseUrl: BASE_URL,
      headers: {
        authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }));
  }

  function onRegister({ email, password }) {
    register({
      email,
      password,
    })
      .then((res) => {
        if (res.statusCode !== 400) {
          setSuccess(true);
        }
      })
      .catch(() => {
        setSuccess(false);
      })
      .finally(() => {
        handleInfoPopup();
      });
  }

  function onLogin({ email, password }) {
    authorize({
      email,
      password,
    })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          addApi(data.token)
          setLoggedIn(true);
          setCurrentEmail(email);
          history.push("/");
        } else {
          setSuccess(false);
          handleInfoPopup();
        }
      })
      .catch(() => {
        setSuccess(false);
        handleInfoPopup();
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoPopup() {
    setInfoPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function onSignOut() {
    setLoggedIn(false);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setInfoPopupOpen(false);
  }

  function handleUpdateUser(user) {
    api
      .setUserInfo(user.name, user.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card.title, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (api) {
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards)
        })
        .catch((err) => console.log(err));
    }
  }, [api]);

  React.useEffect(() => {
    if (api) {
      api
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
    }
  }, [api]);

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/sign-up">
          <div className="page__container">
            <Header loggedIn={loggedIn} />
            <Register onRegister={onRegister} />
          </div>
        </Route>
        <Route path="/sign-in">
          <div className="page__container">
            <Header loggedIn={loggedIn} />
            <Login onLogin={onLogin} />
          </div>
        </Route>
        <ProtectedRoute path="/" exact loggedIn={loggedIn}>
          <div className="page__container">
            <Header
              loggedIn={loggedIn}
              onSignOut={onSignOut}
              currentEmail={currentEmail}
            />
            <Main
              handleAddPlaceClick={handleAddPlaceClick}
              handleEditAvatarClick={handleEditAvatarClick}
              handleEditProfileClick={handleEditProfileClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup
              name={selectedCard.name}
              link={selectedCard.link}
              onClose={closeAllPopups}
            />
            <PopupWithForm
              title="Вы уверены?"
              name="delete"
              buttonTitle="Да"
              onClose={closeAllPopups}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
          </div>
        </ProtectedRoute>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <InfoTooltip
        isOpen={infoPopupOpen}
        success={success}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
