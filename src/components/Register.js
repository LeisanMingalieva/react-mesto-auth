import React from "react";
import { Link } from 'react-router-dom';
import { useForm } from "../hooks/useForm";

export default function Register ({ handleRegister, buttonText}) {
    const {values, handleChange} = useForm({email: "", password: ""})
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(values)
      }
    
    return (
         <div className="register">
            <p className="register__title">Регистрация</p>
            <form onSubmit={handleSubmit} className="register__form" name="register__form">
                <fieldset className="register__field">
                    <input
                        onChange={handleChange}
                        className="register__input"
                        type="email"
                        placeholder="Email"
                        minLength={2}
                        maxLength={40}
                        name="email"
                        value={values.email}
                        autoComplete="email"
                        required
                    >                    
                    </input>
                </fieldset>
                <fieldset className="register__field">
                    <input
                        onChange={handleChange}
                        className="register__input"
                        type="password"
                        placeholder="Пароль"
                        minLength={2}
                        maxLength={40}
                        name="password"
                        value={values.password}
                        autoComplete="new-password"
                        required
                    >
                </input>
                </fieldset> 
                <button  className="register__button" type="submit">{buttonText}</button>               
            </form>
            
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/sign-in" className="register__login-link">Войти</Link>
            </div>
        </div>
    )
}