import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace }) {
  const[title, setTitle] = React.useState('')
  const[link, setLink] = React.useState('')

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  React.useEffect(() => {
    setTitle('')
    setLink('')
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: title,
      link: link,
    });
  }

  return(
    <PopupWithForm
      name = 'cardsForm'
      title = 'Новое место'
      buttonText= 'Создать'
      isOpen={isOpen}      
      onClose={onClose}
      onSubmit={handleSubmit}
    > 
      <fieldset className="popup__form-field">
        <input
          name="name"
          required
          id="input-place"
          type="text"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          className="popup__form-item popup__form-item_el_place"
          value={title ?? ''}
          onChange={handleTitleChange}
        />
        <span className="popup__form-item-error" id="input-place-error"/>
      </fieldset>
      <fieldset className="popup__form-field">
        <input
          name="link"
          required
          id="input-link"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__form-item popup__form-item_el_link"
          value={link ?? ''}
          onChange={handleLinkChange}
        />
        <span className="popup__form-item-error" id="input-link-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;