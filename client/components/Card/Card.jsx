import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { getDecks } from "../../utils/requests.js";

const Card = () => {
  const params = useParams();

  const currentDeck = useSelector((state) =>
    state.decks.decks.find((deck) => deck._id === params.deckId)
  );

  const [flip, setFlip] = useState(false);
  const [isFront, setIsFront] = useState(true);
  const [index, setIndex] = useState(0);

  if (!currentDeck) return null;

  const cards = currentDeck.cards;
  const currentDeckID = currentDeck._id;
  const hasCards = cards.length > 0;

  let cardContent;

  if (hasCards) {
    const card = cards[index];

    if (isFront) {
      cardContent = card.front;
    } else {
      cardContent = card.back;
    }
  }

  const handleDelete = async (e) => {
    try {
      await fetch(`http://localhost:3000/deck/${currentDeckID}/card`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deletedCardID: cards[index]._id }),
      });

      if (index === cards.length - 1) setIndex(Math.max(index - 1, 0));

      await getDecks();
    } catch (error) {
      console.log(error, "error getting cards");
    }
  };

  return (
    <div className={`card`}>
      <div className="addAndDelete">
        <div className="addButton">
          <Link className="addCardLink" to={`/deck/${currentDeckID}/addCard`}>
            Add
          </Link>
        </div>

        <button disabled={!hasCards} onClick={handleDelete}>
          Delete
        </button>
      </div>

      {hasCards ? (
        <div
          className={`flashcard ${flip ? "flip" : ""}`}
          onClick={(e) => {
            setFlip(!flip);
            setIsFront(!isFront);
          }}
        >
          {isFront ? (
            <h2 className="card-front">{cardContent}</h2>
          ) : (
            <h2 className="card-back">{cardContent}</h2>
          )}
        </div>
      ) : null}

      <div className="backAndNext">
        <button
          className="backButton"
          disabled={!hasCards || index === 0}
          onClick={(e) => {
            setIndex(index - 1);
            setIsFront(true);
          }}
        >
          Back
        </button>
        <button
          disabled={!hasCards || index === cards.length - 1}
          onClick={(e) => {
            setIndex(index + 1);
            setIsFront(true);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
