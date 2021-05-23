import React, { useState, useEffect } from "react";

function DeleteListing({ currentUser, setShowDeleteProd, dataServer }) {
  const [deleteData, setDeleteData] = useState({ adminid: "", id: "" });

  useEffect(() => {
    if (currentUser) {
      setDeleteData({ ...deleteData, adminid: currentUser[0].adminid });
    }
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!deleteData.adminid || !deleteData.id) {
      return;
    }

    deleteProduct(deleteData);
  };
  const handleChange = (e) => {
    setDeleteData({ ...deleteData, id: e.target.value });
  };

  const deleteProduct = async (deleteData) => {
    try {
      const response = await fetch(dataServer + "deleteproduct", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminid: deleteData.adminid,
          id: deleteData.id,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "85px" }} className="register">
        <span
          onClick={() => setShowDeleteProd(false)}
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
            name="id"
            placeholder="enter id to delete:"
            onChange={handleChange}
            label="id"
          />
          <button type="submit">Delete Row</button>
        </form>
      </div>
    </div>
  );
}

export default DeleteListing;
