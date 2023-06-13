import React from "react";
import { Link } from 'react-router-dom';

export default function Register ({ handleRegister, buttonText}) {
    const [formValue, setFormValue] = React.useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;    
        setFormValue({ ...formValue, [name]: value });
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(formValue)
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
                        value={formValue.email}
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
                        value={formValue.password}
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