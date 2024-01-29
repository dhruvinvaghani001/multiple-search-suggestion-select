import { useState, useEffect, useRef } from "react";
import "./App.css";
import Pill from "./components/Pill";

function App() {
  const [searchTerm, setSearchterm] = useState("");
  const [suggestionUser, setSuggestionuser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [index, setIndex] = useState(0);
  const inputRef = useRef();

  const handleChange = (e) => {
    setSearchterm(e.target.value);
  };

  const setActiveUser = (user) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchterm("");
    setSuggestionuser([]);
    inputRef.current.focus();
  };

  const inactivateUser = (user) => {
    const updatedSelectedUser = selectedUser.filter(
      (iteam) => iteam.id !== user.id
    );
    setSelectedUser(updatedSelectedUser);

    const updateSelectedUserSet = selectedUserSet.filter(
      (email) => email !== user.email
    );
    setSelectedUserSet(updateSelectedUserSet);
  };

  const onkeyhandlerChnage = (e) => {
    // e.preventDefault();
    console.log(e.key);
    if (e.key == "Backspace" && searchTerm === "" && selectedUser.length > 0) {
      const lastuser = selectedUser[selectedUser.length - 1];
      inactivateUser(lastuser);
    } else if (e.key === "ArrowDown" && suggestionUser?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestionUser.users.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestionUser?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      index >= 0 &&
      index < suggestionUser.users.length
    ) {
      setActiveUser(suggestionUser.users[index]);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestionuser([]);
      return;
    }
    setIndex(0);
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
          {selectedUser?.map((user) => {
            return (
              <Pill
                title={user.firstName}
                img={user.image}
                onclick={() => inactivateUser(user)}
              ></Pill>
            );
          })}
          <input
            type="text"
            placeholder="search user"
            onChange={handleChange}
            value={searchTerm}
            ref={inputRef}
            onKeyDown={onkeyhandlerChnage}
          />
        </div>

        <div className="suggest">
          {suggestionUser?.users?.length > 0 && (
            <div className="suggestions">
              <ul>
                {suggestionUser?.users?.map((user) => {
                  if (!selectedUserSet.has(user.email)) {
                    return (
                      <li key={user.email} onClick={() => setActiveUser(user)}>
                        <img src={user.image} alt="" srcset="" />
                        <p>
                          {user.firstName} {user.lastName}
                        </p>
                      </li>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
