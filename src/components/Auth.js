const fetch = require('node-fetch');

export default class Auth {
  constructor(username, password) {
    this.authenticated = false;
    this.username = username;
    this.password = password;
  }

  async authenticate () {
    const username = this.username;
    const password = this.password
    const params = {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'}
    }
    const call = await fetch("http://localhost:3000/login", params)
    const res = await call.json();
    this.authenticated = res.stauts
  }
}
