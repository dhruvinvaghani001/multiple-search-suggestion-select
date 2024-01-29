import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchterm] = useState("");
  const [suggestionUser, setSuggestionuser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  const handleChange = (e) => {
    setSearchterm(e.target.value);
  };

  const setActiveUser = (user) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet([...selectedUserSet, user.email]);
    setSearchterm("");
    setSuggestionuser([]);
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestionuser([]);
      return;
    }
    const fetchUsers = () => {
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestionuser(data));
    };
    fetchUsers();
  }, [searchTerm]);

  console.log(suggestionUser);

  return (
    <>
      <div className="user-search-conatiner">
        <div className="user-input">
          {/* pill */}

          <input
            type="text"
            placeholder="search user"
            onChange={handleChange}
          />
        </div>
        <div className="suggestions">
          {suggestionUser?.users?.map((user) => {
            if (selectedUserSet.has(user.email)) {
              rteurn(
                <ul key={user.email} onClick={() => setActiveUser(user)}>
                  <img src={user.image} alt="" srcset="" />
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                </ul>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      </div>
    </>
  );
}

export default App;
