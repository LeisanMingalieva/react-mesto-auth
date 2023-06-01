import React from 'react';

function PopupWithForm(props) {
  return (
    <section className = {`popup popup__type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button type="button" className="popup__close" onClick = {props.onClose} />
        <h2 className="popup__form-heading">{ props.title }</h2>
        <form name= {props.name} className="popup__form-container" onSubmit={props.onSubmit} noValidate>                
          {props.children}           
          <button type="submit" className="popup__form-save">{props.buttonText}</button>
        </form>
      </div>
    </section>  
  );
}

export default PopupWithForm;