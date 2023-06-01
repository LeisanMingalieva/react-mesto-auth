import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({onUpdateAvatar, onClose, isOpen}) {
  const avatarRef = React.useRef();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
}

  return(
    <PopupWithForm
      name = 'avatarForm'
      title = 'Обновить аватар'
      buttonText= 'Сохранить'
      isOpen={isOpen}      
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-field">
        <input
          name="avatar"
          required
          id="avatar-link"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__form-item popup__form-item_el_link"
          ref={avatarRef}
        />
        <span className="popup__form-item-error" id="avatar-link-error" />
      </fieldset>
    </PopupWithForm> 
  )
}

export default EditAvatarPopup;