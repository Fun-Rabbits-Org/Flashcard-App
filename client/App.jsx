import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './styles.css';
import NavBar from './components/NavBar/NavBar.jsx';
import DeckContainer from './components/DeckContainer/DeckContainer.jsx';
import Card from './components/Card/Card.jsx';
import CardForm from './components/CardForm/CardForm.jsx';
import { useSelector } from 'react-redux';
import Signup from './components/Login/Signup.js';
import { getDecks } from './utils/requests.js';
import ProfilePage from './components/ProfilePage/ProfilePage.jsx';
import Login from './components/Login/login.js';
import login from './redux/isLoggedIn.js';
import UserInfoReducer from './redux/UserInfo.js';
import { store } from './redux/store.js';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const NotFound = () => <h1>404 Page not found</h1>;

const App = () => {
  const user = useSelector((state) => state.user.userInfo);


  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);



  useEffect(() => {
    getDecks();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('register clicked');
    setPage(<Signup handleSignUpSubmit={handleSignUpSubmit} />);
  };
  const handleSignUpSubmit = () => {
    console.log('login going to');
    setPage(<Login handleRegister={handleRegister} />);
  };
  const [page, setPage] = useState(<Login handleRegister={handleRegister} />);
  const showPage = isLoggedIn ? <Layout /> : page;

  return (
    <div id="AppContainer" className="app-container">
      <Routes>
        <Route path="/" element={showPage}>
          <Route index element={<DeckContainer />} />
          <Route path="deck/:deckId" element={<Card />} />
          <Route path="deck/:deckId/addCard" element={<CardForm />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
