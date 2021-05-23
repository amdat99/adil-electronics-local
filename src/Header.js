import React, { useState } from "react";

function Header({
  toggleUpload,
  currentUser,
  signOutPending,
  toggleRegister,
  toggleAddProduct,
  onRegister,
  onDelete,
  onDeleteProd,
  toggleEmail,
  toggleConnection,
  togglePdf,
  fileServer
}) {
  const [showAdmin, setShowAdmin] = useState(false);
  return (
    <div className="headercont hover">
      <span className="headerlink" onClick={toggleUpload}>
        Upload
      </span>
      <span onClick={toggleAddProduct} className="headerlink">
        Add Product
      </span>

      {currentUser[0].name === "admin" ? (
        <span
          className="headerlink"
          onClick={() => setShowAdmin(!showAdmin)}
          onMouseEnter={() => {
            setShowAdmin(true);
          }}
        >
          {" "}
          Admin Options
        </span>
      ) : null}
      <span onClick={togglePdf} className="headerlink">
        {" "}
        File Viewer
      </span>
      <a href={fileServer+currentUser[0].accessid}>📁Files</a>
      {showAdmin && currentUser[0].name === "admin" ? (
        <div
          onMouseLeave={() => setShowAdmin(false)}
          style={{
            zIndex: 999,
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            background: "whitesmoke",
            width: "120px",
            marginLeft: "40%",
          }}
        >
          <span
            onClick={() => {
              onRegister();
              toggleRegister();
            }}
          >
            Add account
          </span>
          <span
            onClick={() => {
              onDelete();
              toggleRegister();
            }}
          >
            Delete account
          </span>
          <span
            onClick={() => {
              onDeleteProd();
              toggleRegister();
            }}
          >
            Delete listing
          </span>
        </div>
      ) : null}
      <span onClick={toggleConnection} className="connectheader">
        Connection
      </span>
      <span onClick={toggleEmail} className="emailheader">
        Email
      </span>
      <span onClick={signOutPending} style={{ position: "fixed", right: 30 }}>
        Sign Out
      </span>
    </div>
  );
}

export default Header;
