import React from 'react';
import logo from '../image/header_logo.svg';
import {Link, useLocation} from 'react-router-dom';

function Header({loggedIn, userEmail, onSignOut}) {
  const url = useLocation();
  const path = (url.pathname === '/sign-up') ? '/sign-in' : '/sign-up';
  const linkTitle = (url.pathname === '/sign-up') ? 'Войти' : 'Регистрация'
  return (
    <header className="header">
      <img src = { logo } alt="Логотип Mesto" className="header__logo" />
      {loggedIn ? (
        <div className='header__container'>
          <p className='header__email'>{userEmail}</p>
          <button className='header__link' onClick={onSignOut}>Выйти</button>
        </div>
      ) : (
        <Link className='header__link' to={path}>{linkTitle} </Link>
      )}
    </header>
  )
}

export default Header;