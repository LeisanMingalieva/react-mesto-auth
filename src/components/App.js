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

import {api} from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


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

//получение карточек и данных пользовотеля с сервера
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

  //выход из системы
  function signOut () {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in');
  }
//регистрация пользователя
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
const handleLogin = ({email, password}) => {
  Auth.authorize(email, password)
    .then(data => {
      if(data.token) {
        localStorage.setItem('token', data.token)
        setLoggedIn(true)
        setUserEmail(email)
        navigate('/main')
      }
    })
    .catch(err => {
      console.log(err)
    })
}
//Проверка валидности токена
const tokenCheck = () => {
  const token = localStorage.getItem("token")
  if (token) {
    Auth.tokenCheck(token)
      .then(user => {
        const userEmail = user.data.email;
        setLoggedIn(true)
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
// функция открытия попапа редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
// функция открытия попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
// функция открытия попапа добавления карточек
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  //универсальная функция, которая принимает функцию запроса
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
// функция редактирования профиля
  function handleUpdateUser(data) {
    function makeRequest() {
      return api.setUserData(data).then(setCurrentUser)
    }
    handleSubmit(makeRequest);
  }
// функция редактирования аватара
  function handleUpdateAvatar(data) {
    function makeRequest() {
      return api.setUserAvatar(data).then(setCurrentUser)
    }
    handleSubmit(makeRequest);
  }
// функция добавления карточек
  function handleAddPlaceSubmit(card) {
    function makeRequest() {
      return api.postNewCard(card).then((newCard) => {
        setCards([newCard, ...cards]);
      })
    }
    handleSubmit(makeRequest);
  }
// функция лайков карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.log)
  }
// функция удаления карточек
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((arr) => arr.filter(item => card._id !== item._id))
        closeAllPopups()
      })
      .catch(console.log)
  } 
   // функция увеличения изображения
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
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
      <ImagePopup 
        isOpen={isImageOpen}
        onClose={closeAllPopups}
        card={selectedCard}
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
