import React from 'react';

function PopupWithForm({name, isOpen, onClose, title, onSubmit, buttonText, children}) {
  return (
    <section className = {`popup popup__type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button type="button" className="popup__close" onClick = {onClose} />
        <h2 className="popup__form-heading">{ title }</h2>
        <form name= {name} className="popup__form-container" onSubmit={onSubmit} noValidate>                
          {children}           
          <button type="submit" className="popup__form-save">{buttonText}</button>
        </form>
      </div>
    </section>  
  );
}

export default PopupWithForm;