import React, { useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../../redux/store";
import { searchInputText } from "../../redux/decksSlice";

const NavBar = () => {
  const [cardSearchTerm, setCardSearchTerm] = useState("");

  const handleSearchInput = (e) => {
    const searchTerm = e.target.value;
    setCardSearchTerm(searchTerm);
    store.dispatch(searchInputText(searchTerm));
  };

  return (
    <nav className="NavBar">
      <div className="menuDiv">
        <ul className="menu">
          <li>
            <Link className="logo" to="/">
              coolcards
            </Link>
          </li>
          <li className="text-red-800">Study</li>
          <li>
            <div>
              <input
                onChange={handleSearchInput}
                className="searchBar"
                placeholder="Search for flash cards"
              ></input>
            </div>
          </li>
          <li>
            <Link className="navbar-text" to="/profile">
              Profile
            </Link>
          </li>
          <li>Generate</li>
          <li>Username</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
