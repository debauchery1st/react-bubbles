import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

const Login = ({ onstart, ...kwargs }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const history = useHistory();
  const initCreds = {
    username: "",
    password: ""
  };
  const [signError, setSignError] = useState();
  const [creds, setCreds] = useState({ ...initCreds });
  const handleChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", creds)
      .then(res => {
        // console.log(res);
        setSignError("");
        setCreds({ ...initCreds });
        localStorage.setItem("token", res.data.payload);
        history.push("/bubbles");
      })
      .catch(err => {
        // console.log(err.response);
        setSignError(err.response.data.error);
      });
  };
  onstart && onstart();
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleSubmit}>
        {signError && <div className="Error">{signError}</div>}
        <input
          type="username"
          name="username"
          autoComplete="username"
          placeholder="Username"
          value={creds.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          autoComplete="password"
          placeholder="Password"
          value={creds.password}
          onChange={handleChange}
        />
        <button type="submit">Sign in</button>
      </form>
    </>
  );
};

export default Login;
