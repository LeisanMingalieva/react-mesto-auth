export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(checkResponse)
    // return request(`/signup`), {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({email, password})
    // }
}

export function authorize (email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(checkResponse)
}

// export function authorize (email, password) {
//     return request('/signin'), {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({email, password})
//     }
// }

export function tokenCheck (token)  {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(checkResponse)
}

const checkResponse = res => {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ой, ошибка ${res.status}`)
}

// const request = (urlEndpoint, options) => {
//     return fetch(`${BASE_URL}${urlEndpoint}`, options)
//       .then(checkResponse)
// }
