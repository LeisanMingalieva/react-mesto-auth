import React from "react";
import { useForm } from "../hooks/useForm";

export default function Login({ buttonText, handleLogin}) {
    const {values, handleChange, setValues} = useForm({email: "", password: ""})

     const handleSubmit =(e) => {
        e.preventDefault();
        
        handleLogin(values);
        setValues({
            email: "",
            password: "",
          });
    }
   
    return (
        <div className="login">
            <p className="login__title">Вход</p>
            <form onSubmit={handleSubmit} className="login__form" name="login__form">
                <fieldset className="login__field">
                    <input
                        onChange={handleChange}
                        className="login__input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        minLength={2}
                        maxLength={40}
                        value={values.email}
                        autoComplete="email"
                        required
                    >                    
                    </input>
                </fieldset>
                <fieldset className="login__field">
                    <input
                        onChange={handleChange}
                        className="login__input"
                        type="password"
                        placeholder="Пароль"
                        minLength={2}
                        maxLength={40}
                        name="password"
                        value={values.password}
                        autoCorrect="password"
                        required
                    >
                </input>
                </fieldset> 
                <button className="login__button" type="submit">{buttonText}</button>               
            </form>
        </div>
    )
}