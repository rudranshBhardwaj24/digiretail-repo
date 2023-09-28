import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";
import AddUser from "./AddUser";
import {
  saveUsersToLocalStorage,
  getUsersFromLocalStorage,
} from "./localStorage";

function App() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState(data);
  const [search, setSearch] = useState("");

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = data.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    setSearchData(filteredData);
  };

  const handleAddUser = (newUser) => {
    // Generate a unique ID for the new user
    const newUserId = Math.max(...data.map((user) => user.id), 0) + 1;
    newUser.id = newUserId;

    setData([...data, newUser]);
    saveUsersToLocalStorage([...data, newUser]);
    setSearchData([...searchData, newUser]);
  };

  const handleDeleteUser = (userId) => {
    const updatedData = data.filter((user) => user.id !== userId);
    setData(updatedData);
    setSearchData(updatedData);
    saveUsersToLocalStorage(updatedData);
  };

  useEffect(() => {
    const storedUsers = getUsersFromLocalStorage();

    if (storedUsers.length > 0) {
      // If data exists in local storage, set it to state
      setData(storedUsers);
      setSearchData(storedUsers);
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();
          setData(jsonData);
          setSearchData(jsonData);
          saveUsersToLocalStorage(jsonData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div>
      <div className="search-and-add">
        <AddUser onAddUser={handleAddUser} />
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            placeholder="Search"
            value={search}
            onChange={handleSearchInput}
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="container-box">
        <div className="container">
          {searchData.map((user) => (
            <Card key={user.id} user={user} onDeleteUser={handleDeleteUser} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
