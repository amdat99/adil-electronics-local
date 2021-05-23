import React, { useState, useEffect } from "react";

function DeleteUser({ currentUser, setShowDelete, dataServer }) {
  const [deleteData, setDeleteData] = useState({ adminid: "", userid: "" });
  const [usersData, setUsersData] = useState([]);
  const [adminId, setAdminId] = useState(null);
  useEffect(() => {
    if (currentUser) {
      setDeleteData({ ...deleteData, adminid: currentUser[0].adminid });
      setAdminId(currentUser[0].adminid);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!deleteData.adminid || !deleteData.userid) {
      return;
    }

    deleteUser(deleteData);
  };
  const handleChange = (e) => {
    setDeleteData({ ...deleteData, userid: e.target.value });
  };

  const deleteUser = async (deleteData) => {
    try {
      const response = await fetch(dataServer + "deleteaccount", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminid: deleteData.adminid,
          userid: deleteData.userid,
        }),
      });
      const data = await response.json();
      if (data) {
        fetchUsers();
      }
      console.log(data);
    } catch (e) {
      console.log("error", e);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(dataServer + "fetchusers", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminid: currentUser[0].adminid,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data === "only admin can fetch all users") {
        return;
      }
      if (data) {
        setUsersData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="register">
        <span
          onClick={() => setShowDelete(false)}
          style={{
            color: "red",
            cursor: "pointer",
            position: "absolute",
            left: "98%",
          }}
        >
          x
        </span>
        {usersData
          ? usersData.map((user) => (
              <div className="profiles" key={user.userid}>
                <span>{user.name}: </span>
                <span style={{ marginLeft: "10px" }}>{user.userid}</span>
              </div>
            ))
          : null}
        <form style={{ marginTop: "10px" }} onSubmit={handleSubmit}>
          <input
            className="sign-on-input"
            type="text"
            name="userid"
            placeholder="enter userid to delete:"
            onChange={handleChange}
            label="userid"
          />
          <button type="submit">Delete</button>
        </form>
      </div>
    </div>
  );
}

export default DeleteUser;
