const url = "https://dicedemo.herokuapp.com/"

export default class Api {
  post(api, data) {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    return fetch(`${url}${api}`, option)
      .then((response) => {
        return response.json()
      })
  }
}