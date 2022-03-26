import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <form className="formPanel bg-[#f6f9f0] px-4 mx-auto py-4 rounded-lg mb-9 formShadow" onSubmit={login}>
      <h2 className="text-2xl text-center mb-6">Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none shadow-md mx-0"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            className="w-full px-4 py-1 text-gray-800 rounded-lg focus:outline-none shadow-md mx-0"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div className="flex justify-end ">
        <input className="button" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
