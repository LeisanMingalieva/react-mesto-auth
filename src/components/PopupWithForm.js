import React from 'react';

function PopupWithForm({name, isOpen, onClose, title, onSubmit, buttonText, children, isLoading, handleOverlayClick }) {
  return (
    <section className = {`popup popup__type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
      <div className="popup__content">
        <button type="button" className="popup__close" onClick = {onClose} />
        <h2 className="popup__form-heading">{ title }</h2>
        <form name= {name} className="popup__form-container" onSubmit={onSubmit}>                
          {children}           
          <button type="submit" className="popup__form-save">{isLoading ? ('Сохранение...') : (buttonText)}</button>
        </form>
      </div>
    </section>  
  );
}
export default PopupWithForm;