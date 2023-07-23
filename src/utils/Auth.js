export const BASE_URL = 'https://api.mesto-andriyanova.nomoredomains.xyz';

const request = (urlEndpoint, options) => {
    return fetch(`${BASE_URL}${urlEndpoint}`, options)
      .then(checkResponse)
}

export const register = (email, password) => {
    return request('/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}

export function authorize (email, password) {
    return request('/signin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}

export function tokenCheck (token)  {
    return request('/users/me', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

const checkResponse = res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ой, ошибка ${res.status}`)
}

