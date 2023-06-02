import React from "react";

export default function Login() {
    return (
        <div className="login">
            <p className="login__title">Вход</p>
            <form className="login__form">
                <fieldset className="login__field">
                    <input
                        className="login__input"
                        type="email"
                        placeholder="Email"
                        minLength={2}
                        maxLength={40}
                    >                    
                    </input>
                </fieldset>
                <fieldset className="login__field">
                    <input
                        className="login__input"
                        type="password"
                        placeholder="Пароль"
                        minLength={2}
                        maxLength={40}
                    >
                </input>
                </fieldset>                
            </form>
            <button className="login__button" type="button">Войти</button>
        </div>
    )
}