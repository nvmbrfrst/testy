class Api {
    #baseurl;
    #headers;
    constructor({ baseUrl, headers }) {
        this.#baseurl = baseUrl;
        this.#headers = headers;
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
    }

    getAllInfo() {
        return Promise.all([this.getProductsList(), this.getUserInfo()])
    }

    getProductsList() {
        return fetch(`${this.#baseurl}/products`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    getUserInfo() {
        return fetch(`${this.#baseurl}/users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    search(searchQuery) {
        return fetch(`${this.#baseurl}/products/search?query=${searchQuery}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    setUserInfo({ name, about }) {
        return fetch(`${this.#baseurl}/users/me`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({ name, about })
        })
            .then(this.#onResponse)
    }
}

const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI4ZjYiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ4LCJleHAiOjE3MTAzMzg0NDh9.9WW0ZuAn-hKVrwAplfEKUguM1rl1RMvqneaDDT4W1-U'
    }
})

export default api;

// api.getProductsList()
//     .then(data => console.log('cards', data))
//     .catch(err => console.log(err))

// api.getUserInfo()
//     .then(data => console.log('user', data))
//     .catch(err => console.log(err))