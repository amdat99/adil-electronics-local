import React, { useState } from "react";

function Register({ signUpPending, setShowRegister }) {
  const [signUpData, setSignUpData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { password, confirmPassword } = signUpData;

    if (password.length !== 6 && password !== confirmPassword) {
      alert(
        "passwords error, make sure your password has 6 characters and they match"
      );
      return;
    }
    signUpPending(signUpData);
    // if (error !== null) {
    //   alert(error);
    // }
    setSignUpData({ username: "", password: "", confirmPassword: "" });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setSignUpData({ ...signUpData, [name]: value });
  };

  const { userName, password, confirmPassword } = signUpData;
  return (
    <div className="register">
      <span
        onClick={() => setShowRegister(false)}
        style={{
          color: "red",
          cursor: "pointer",
          position: "absolute",
          left: "98%",
        }}
      >
        x
      </span>
      <form className="" onSubmit={handleSubmit}>
        <input
          className="sign-on-input"
          type="text"
          name="userName"
          placeholder="enter a username:"
          value={userName}
          onChange={handleChange}
          label={userName}
          required
        />

        <input
          className="sign-on-input"
          type="password"
          name="password"
          placeholder="enter your password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <input
          className="sign-on-input"
          type="password"
          name="confirmPassword"
          placeholder="reenter your password "
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />

        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
}

export default Register;
