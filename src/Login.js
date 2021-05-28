import React, { useState, useEffect} from "react";
import Logo from "./adil-electronics.jpg";

import Connection from "./Connection";

function Login({ currentUser, emailSignInPending, dataServer }) {
  const [signinData, setSignInInfo] = useState({ userName: "", password: "",server:'' });
  const [toggleConnection, setToggleConnection] = useState(false);

  useEffect(() => {
    setSignInInfo({...setSignInInfo, server:dataServer})
  },[dataServer])
  const { userName, password } = signinData;
  const handleSubmit = async (event) => {
    if (!userName || !password) {
      return;
    }
    event.preventDefault();
    emailSignInPending(signinData);
    // if(error !== null){
    //     alert(error)
    // }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setSignInInfo({ ...signinData, [name]: value });
  };

  return (
    <div>
      <span
        className="connectheader"
        onClick={() => setToggleConnection(!toggleConnection)}
      >
        Configure Connection
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {toggleConnection ? (
          <Connection setShowConnections={setToggleConnection} />
        ) : null}
        <img
          src={Logo}
          alt="logo"
          width="300"
          height="120"
          style={{ marginTop: "50px", borderRadius: "30px" }}
        />
        <form className="sign-on-container" onSubmit={handleSubmit}>
          <input
            name="userName"
            type="text"
            value={userName}
            placeholder="Enter your username"
            onChange={handleChange}
            label="userName"
            className="sign-on-input"
            required
          />

          <input
            name="password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
            label="password"
            className="sign-on-input"
            required
          />
          <div className="button">
            <button type="submit"> Sign In </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
