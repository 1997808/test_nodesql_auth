import React, { useState } from 'react';
import Axios from 'axios'
import 'bootstrap';

function App() {
  console.log("rerender")
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [loginStatus, setLoginStatus] = useState("")

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      username: usernameReg,
      password: passwordReg
    }).then((response) => {
      console.log(response)
    })
  }

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus(response.data[0].username)
      }
      console.log(response.data)
    })
  }

  return (
    <div className="App">
      <div className="container">

        <div className="row">
          <form className="col-6 py-5">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" onChange={(e) => { setUsernameReg(e.target.value) }}></input>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={(e) => { setPasswordReg(e.target.value) }}></input>
            </div>
            <button className="btn btn-secondary"
              onClick={(e) => {
                register()
                e.preventDefault()
              }}>Sign up</button>
          </form>
        </div>


        <div className="row">
          <form className="col-6 offset-6 py-5">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" onChange={(e) => { setUsername(e.target.value) }}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value) }}></input>
            </div>
            <button className="btn btn-primary"
              onClick={(e) => {
                login()
                e.preventDefault()
              }}>Sign in</button>
          </form>

          <p>{loginStatus}</p>
        </div>

      </div>
    </div>
  );
}

export default App;
