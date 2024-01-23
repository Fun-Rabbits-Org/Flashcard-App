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
import Authorize from './components/Login/Authorize.js';
import { store } from './redux/store.js';
import { UserInfoReducer } from './redux/UserInfo.js';
import { login } from './redux/isLoggedIn.js';
const Layout = () => {
  const logout = () => {
    store.dispatch(UserInfoReducer({}))
    store.dispatch(login(false));
  }
  return (
    <>
      <NavBar logout={logout}/>
      <Outlet />
    </>
  );
};

const NotFound = () => <h1>404 Page not found</h1>;

const App = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state)=> state.user.userInfo)
  useEffect(() => {
    getDecks();
  }, []);

  useEffect(()=>{
    const data = window.localStorage.getItem('USERINFO')
    console.log('---------', data)
    store.dispatch(UserInfoReducer(JSON.parse(data)))
    store.dispatch(login(true));
  },[])

  useEffect(()=>{
    window.localStorage.setItem('USERINFO',JSON.stringify(user))
  },[user])
  
  const state = useSelector((state) => state);
  
  const handleRegister = (e) => {
    e.preventDefault
    setPage(<Signup handleSignUpSubmit={handleSignUpSubmit}/>)
  }
  const handleSignUpSubmit = () => {
    setPage(<Login/>)
  }

  
  
  const [page, setPage] = useState(<Login handleRegister = {handleRegister}/>)
  const showPage = isLoggedIn ? <Layout/> : page
{/* <Route path='/' element={
            showPage
        }> */}
        return (
          <div id="AppContainer">
            <Routes>
              <Route path='/' element={
            showPage
        }>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route index element={<DeckContainer />} />
                <Route path="deck/:deckId" element={<Card />} />
                <Route path="deck/:deckId/addCard" element={<CardForm />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        );
};

export default App;