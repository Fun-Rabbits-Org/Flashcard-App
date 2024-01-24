import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Deck from '../Deck/Deck.jsx';
import { getDecks } from '../../utils/requests.js';

// create component body
const DeckContainer = () => {
  const [newDeck, setNewDeck] = useState('');
  const decks = useSelector((state) => state.decks.decks);
  console.log(decks);

  const renderedDecks = decks.map((deck, index) => (
    <Deck key={deck._id} deck={deck} index={index} />
  ));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({ deckName: newDeck, cards: [] });
    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      await getDecks();
      setNewDeck('');
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  return (
    <div className="DeckContainer">
      <div className="formDiv">
        <div className="deckSquare">
          <h2>Decks</h2>
        </div>

        <div className="addNewDeck">
          <h3>Flashcards</h3>
          <h4>Add a new deck below</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter deck name"
              value={newDeck}
              onChange={(e) => setNewDeck(e.target.value)}
            ></input>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>

      <section className="deckSection">{renderedDecks}</section>
    </div>
  );
};

export default DeckContainer;
