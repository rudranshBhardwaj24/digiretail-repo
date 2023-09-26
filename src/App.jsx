import { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

function App() {
  const [data, setData] = useState([]);

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
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {" "}
      <div>
        {data.map((user, index) => (
          <Card key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
