import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./styles.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import DeckContainer from "./components/DeckContainer/DeckContainer.jsx";
import Card from "./components/Card/Card.jsx";
import CardForm from "./components/CardForm/CardForm.jsx";

import { getDecks } from "./utils/requests.js";
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx";

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
  useEffect(() => {
    getDecks();
  }, []);

  return (
    <div id="AppContainer" className="app-container">
      <Routes>
        <Route path="/" element={<Layout />}>
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
