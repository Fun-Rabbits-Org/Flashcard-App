import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../redux/store';
import { searchInputText } from '../../redux/decksSlice';
import { login } from '../../redux/isLoggedIn';
import { UserInfoReducer } from '../../redux/UserInfo';
import { useSelector, useDispatch } from 'react-redux';

const NavBar = () => {
  const [cardSearchTerm, setCardSearchTerm] = useState('');

  const handleSearchInput = (e) => {
    const searchTerm = e.target.value;
    setCardSearchTerm(searchTerm);
    store.dispatch(searchInputText(searchTerm));
  };

  const logout = () => {
    console.log('logout clicked');
    // store.dispatch(UserInfoReducer(null));
    // store.dispatch(login(false));
    localStorage.clear();
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
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
