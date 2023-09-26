import "./Card.css";

function Card({ user }) {
  const { name, username, email, phone, website } = user;

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-text">Username: {username}</p>
        <p className="card-text">Email: {email}</p>
        <p className="card-text">Phone: {phone}</p>
        <p className="card-text">Website: {website}</p>
      </div>
    </div>
  );
}

export default Card;
