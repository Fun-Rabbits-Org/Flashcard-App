import React from "react";
import { useNavigate } from "react-router-dom";
import { getDecks } from "../../utils/requests";

const Deck = ({ deck, index }) => {
  const navigate = useNavigate();

  const handleDeckClick = () => {
    navigate(`/deck/${deck._id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/deck/${deck._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) getDecks();
    } catch (error) {
      console.log(error, "error getting decks");
    }
  };

  const colorsArray = [
    "#00A7ED",
    "#8361F4",
    "#E75552",
    "#EA9823",
    "#87CE45",
    "#93D5F3",
    "#29BDB6",
  ];

  const styles = {
    backgroundColor:
      colorsArray[Math.floor(Math.random() * colorsArray.length + 1) - 1],
  };

  return (
    <div id={`deck${index}`} className="Deck">
      <div className="deckColor" onClick={handleDeckClick} style={styles}>
        <h2>{deck.deckName} </h2>
      </div>
      <div>
        <button className="delete-deck-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Deck;
