class Api {
  constructor (config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getInitialCards() {
    return this._request("/cards", {
        method: 'GET',
        headers:this.headers,
    })
  }

  getUserData() {
    return this._request("/users/me", {
      method: 'GET',
        headers: this.headers
    })
 }

  setUserData(userInfo) {
    return this._request("/users/me", {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
            name: userInfo.name,
            about: userInfo.about
        })
     })
  }
  
  setUserAvatar(userInfo) {
    return this._request("/users/me/avatar", {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
            avatar: userInfo.avatar
        })
     })
  }

  postNewCard(card) {
    return this._request("/cards", {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  _checkResponse = res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ой, ошибка ${res.status}`)
  }  

  _request(urlEndpoint, options) {
    return fetch(`${this.url}${urlEndpoint}`, options).then(this._checkResponse)
  }

  changeLikeCardStatus(obj, variable) {
    this._status = variable ? this.likeCard(obj) : this.dislikeCard(obj);
    return this._status;
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '96b297f0-a85f-4378-98b7-30ead3538e01',
    'Content-Type': 'application/json'
  },
})