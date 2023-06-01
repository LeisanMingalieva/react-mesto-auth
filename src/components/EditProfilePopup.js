import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({onUpdateUser, isOpen, onClose}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext)

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {        
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  return (
    <PopupWithForm
      name = 'profileForm'
      title = 'Редактировать профиль'
      buttonText= 'Сохранить'
      isOpen = {isOpen}    
      onClose={onClose}
      onSubmit = {handleSubmit}
    > 
      <fieldset className="popup__form-field">
        <input
          placeholder="Имя"
          type="text"
          className="popup__form-item popup__form-item_el_name"
          id="input-name"
          required
          minLength={2}
          maxLength={40}
          name="name"
          value={name ?? ''}
          onChange={handleNameChange}
        />
        <span className="popup__form-item-error" id="input-name-error" />
      </fieldset>
      <fieldset className="popup__form-field">
        <input
          placeholder="О себе"
          type="text"
          className="popup__form-item popup__form-item_el_job"
          id="input-job"
          required
          minLength={2}
          maxLength={200}
          name="about"
          value={description ?? ''}
          onChange={handleDescriptionChange}
        />
        <span className="popup__form-item-error" id="input-job-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;