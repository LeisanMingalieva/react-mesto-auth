import React from "react";
import successIcon from '../image/succesIcon.png'
import failIcon from '../image/failIcon.png'

function InfoToolTip ({name, registrated, isOpen, onClose, successTitle, failTitle, handleOverlayClick }) {
    return (
    <section className= {`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClick} aria-label="Изображение">
        <div className="popup__content">
          <button type="button" className="popup__close" onClick={onClose} />
          {registrated ? (
            <>
            <img className="popup__tooltip-img" alt="Успешная регистрация" src={successIcon} />
            <p className="popup__tooltip-text">{successTitle}</p>
            </>    
          ) : (
            <>
            <img className="popup__tooltip-img" alt="Неуспешная регистрация" src={failIcon} />
            <p className="popup__tooltip-text">{failTitle}</p>
            </> 
          )}
        </div>
    </section>
    )
};
export default InfoToolTip;

