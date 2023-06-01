import React from 'react';

function ImagePopup({isOpen, onClose, card, }) {
  return (
    <section className= {`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} aria-label="Изображение">
        <figure className="popup__image-container">
            <button type="button" className="popup__close" onClick={onClose} />
            <img src={card.link} alt={card.name} className="popup__image" />
            <figcaption className="popup__image-title">{card.name}</figcaption>
        </figure>
    </section>
  );
}

export default ImagePopup;