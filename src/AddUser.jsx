import React, { useState } from "react";
import "./AddUser.css";

const AddUser = ({ onAddUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    company: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name && user.email) {
      onAddUser(user);
      setUser({
        name: "",
        email: "",
        address: "",
        company: "",
      });
      setErrorMessage("");
    } else {
      setErrorMessage("Please fill in the required fields.");
    }
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-title">Add User</h2>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={user.company}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddUser;
