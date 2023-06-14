import '../index.css';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';
import * as Auth from '../utils/Auth.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';


function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImageOpen, setIsImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registrated, setRegistrated] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch(console.log)
    }
  }, [loggedIn])

  //Выход из системы
  function signOut () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in');
  }
//Регистрация пользователя
const handleRegister = ({ email, password }) => {
  Auth.register( email, password )          
    .then(() => {
      setRegistrated(true);
      navigate("/sign-in", { replace: true })
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {      
      setIsInfoTooltipOpen(true);
    })
}
//Авторизация пользователя
const handleLogin = ({ email }) => {
  setLoggedIn(true);
  setUserEmail(email);
  setRegistrated(true);
}
//Проверка валидности токена
const tokenCheck = () => {
  const token = localStorage.getItem("token")
  if (token) {
    Auth.tokenCheck(token)
      .then(user => {
        const userEmail = user.data.email;
        handleLogin(user);
        navigate("/main");
        setUserEmail(userEmail)
      })
      .catch(console.log)
  }
}

useEffect(() => {
  tokenCheck();
}, [])
  

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImageOpen(false)
    setIsInfoTooltipOpen(false)
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImageOpen || isInfoTooltipOpen
  useEffect(() => {
    function closeByEsc(e) {
      if(e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEsc);
      return () => {
        document.removeEventListener('keydown', closeByEsc)
      }
    }
  }, [isOpen])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserData(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setUserAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.log)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((arr) => arr.filter(item => card._id !== item._id))
        closeAllPopups()
      })
      .catch(console.log)
  }  

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.postNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      })
  }
  
  function handleCardClick(card) {
    setIsImageOpen(true)
    setSelectedCard(card)
  }  

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
    <Header 
        userEmail={userEmail}
        onSignOut={signOut}
        loggedIn={loggedIn}
      />     
      <Routes>        
        <Route path="/sign-up" element={ 
          <Register
            handleRegister={handleRegister}
            buttonText='Зарегистрироваться'
          /> }
        />
        <Route path="/sign-in" element={ 
          <Login
            handleLogin={handleLogin}
            buttonText='Войти'
          /> 
        }/>
        <Route path="/main" element={
          <ProtectedRoute
            loggedIn={loggedIn}
            element={Main}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            onCardLike= {handleCardLike}
            onCardDelete={handleCardDelete}
            cards = {cards}
          />
        }/>
        <Route path="/" element={
          loggedIn ? 
          <Navigate to="/main" /> : 
          <Navigate to="sign-in" replace />
        }/>
      </Routes>           
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />      
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />
      <ImagePopup 
        isOpen={isImageOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <InfoToolTip
        name = {'succes'}
        successTitle="Вы успешно зарегистрировались!"
        failTitle="Что-то пошло не так! Попробуйте ещё раз."
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        registrated={registrated}
      />
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
