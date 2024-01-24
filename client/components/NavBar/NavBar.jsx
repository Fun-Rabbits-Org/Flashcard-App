import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../redux/store';
import { searchInputText } from '../../redux/decksSlice';
import { login } from '../../redux/isLoggedIn';
import { UserInfoReducer } from '../../redux/UserInfo';

const NavBar = ({ logout }) => {
  const [cardSearchTerm, setCardSearchTerm] = useState('');

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
          <li>
            <Link className="nav-link">Study</Link>
          </li>
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
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="nav-link">Generate</Link>
          </li>
          <li>
            <Link className="logout" onClick={logout}>
              LOG OUT
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
