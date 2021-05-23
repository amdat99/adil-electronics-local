import React, { useState, useEffect } from "react";

function Email({ setShowEmail }) {
  const [emailData, setEmailData] = useState({
    sendto: "",
    subject: "",
    body: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (emailData.sendto || emailData.subject || emailData.body) {
      return;
    }
    // signUpPending(emailData);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setEmailData({ ...emailData, [name]: value });
  };
  return (
    <div>
      <div className="email">
        <span
          onClick={() => setShowEmail(false)}
          style={{
            color: "red",
            cursor: "pointer",
            position: "absolute",
            left: "98%",
          }}
        >
          x
        </span>
        <form onSubmit={handleSubmit}>
          <input
            className="sign-on-input"
            type="text"
            name="sendto"
            placeholder="Send to :"
            onChange={handleChange}
            label="sendto"
          />
          <input
            className="sign-on-input"
            type="text"
            name="subjcet"
            placeholder="subject :"
            onChange={handleChange}
            label="subjcet"
          />
          <textarea
            className="sign-on-input"
            type="text"
            name="body"
            placeholder="body:"
            onChange={handleChange}
            label="body"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Email;
