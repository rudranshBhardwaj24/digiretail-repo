import React from "react";
import "./Card.css";

const Card = ({ user, onDeleteUser }) => {
  const handleDelete = () => {
    onDeleteUser(user.id);
  };

  return (
    <div className="card">
      <h2 className="card-title">{user.name}</h2>
      <p className="card-text">Email: {user.email}</p>
      <p className="card-text">
        Address: {user.address.street}, {user.address.city}
      </p>
      <p className="card-text">Company: {user.company.name}</p>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Card;
