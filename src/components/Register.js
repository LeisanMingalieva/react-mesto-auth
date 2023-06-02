import React from "react";
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className="register">
            <p className="register__title">Регистрация</p>
            <form className="register__form">
                <fieldset className="register__field">
                    <input
                        className="register__input"
                        type="email"
                        placeholder="Email"
                        minLength={2}
                        maxLength={40}
                    >                    
                    </input>
                </fieldset>
                <fieldset className="register__field">
                    <input
                        className="register__input"
                        type="password"
                        placeholder="Пароль"
                        minLength={2}
                        maxLength={40}
                    >
                </input>
                </fieldset>                
            </form>
            <button className="register__button" type="button">Зарегистрироваться</button>
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/login" className="register__login-link">Войти</Link>
            </div>
        </div>
    )
}