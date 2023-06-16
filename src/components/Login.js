import React, { useState} from "react";

export default function Login({ buttonText, handleLogin}) {
    const [formValue, setFormValue] = useState({ email: "", password: "" })

    const handleChange =(e) => {
        const {name, value} = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        
        handleLogin(formValue);
        setFormValue({
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
                        value={formValue.email}
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
                        value={formValue.password}
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