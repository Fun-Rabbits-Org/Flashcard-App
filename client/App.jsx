import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './styles.css';
import NavBar from './components/NavBar/NavBar.jsx';
import DeckContainer from './components/DeckContainer/DeckContainer.jsx';
import Card from './components/Card/Card.jsx';
import CardForm from './components/CardForm/CardForm.jsx';
import Login from './components/Login/login.js';
import Signup from './components/Login/Signup.js';
import { getDecks } from './utils/requests.js';
import { useSelector, useDispatch } from "react-redux";
// import { getDecks } from './utils/requests.js';
// import Authorize from './components/Login/Authorize.js';
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
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state)=> state.user.userInfo)
  console.log(isLoggedIn, user)
  useEffect(() => {
    getDecks();
  }, []);
  const state = useSelector((state) => state);
  console.log(state)
  
  const handleRegister = (e) => {
    e.preventDefault
    setPage(<Signup handleSignUpSubmit={handleSignUpSubmit}/>)
  }
  const handleSignUpSubmit = () => {
    setPage(<Login/>)
  }
  
  const [page, setPage] = useState(<Login handleRegister = {handleRegister}/>)
  const showPage = isLoggedIn ? <Layout/> : page

  return (
    <div id='AppContainer'>
      <Routes>
        <Route path='/' element={
            showPage
        }>
          <Route index element={<DeckContainer />} />
          <Route path='deck/:deckId' element={<Card />} />
          <Route path='deck/:deckId/addCard' element={<CardForm />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;