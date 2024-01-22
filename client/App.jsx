import React, { useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './styles.css';
import NavBar from './components/NavBar/NavBar.jsx';
import DeckContainer from './components/DeckContainer/DeckContainer.jsx';
import Card from './components/Card/Card.jsx';
import CardForm from './components/CardForm/CardForm.jsx';
import Login from './components/Login/login.js';
import PrivateRoute from './components/Login/PrivateRoute.js';
import { useSelector, useDispatch } from "react-redux";

import { getDecks } from './utils/requests.js';

const Layout = () => {
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    )
  
};

const NotFound = () => <h1>404 Page not found</h1>;

const App = () => {
  useEffect(() => {
    getDecks();
  }, []);
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  const showPage = isLogged ? <Layout/> : <Login/>
  return (
    <div id='AppContainer'>
      <Routes>
        <Route path='/' element={
          // <PrivateRoute>
            showPage
          // {/* </PrivateRoute> */}
        }>
          <Route path='/login' element={<Login/>} />
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
