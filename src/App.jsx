import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

function App() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState(data);
  const [search, setSearch] = useState("");

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const filteredData = data.filter((data) =>
      data.name.toLowerCase().includes(search.toLowerCase())
    );

    setSearchData(filteredData);
    console.log(data);
  };

  useEffect(() => {
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
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          class="search-box"
          placeholder="Search"
          value={search}
          onChange={handleSearchInput}
        />
        <button class="btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="container-box">
        <div className="container">
          {searchData.map((user, index) => (
            <Card key={index} user={user} />
          ))}
        </div>
      </div>

      <div className="error">
        {searchData.length <= 0 && <h1>Data does not exist</h1>}
      </div>
    </div>
  );
}

export default App;
