import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Deck from "../Deck/Deck.jsx";
import { getDecks } from "../../utils/requests.js";
import { render } from "react-dom";

import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
} from "@mui/material";
import { Favorite, Share, MoreVert } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red } from "@mui/material/colors";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DeckContainer = () => {
  const [newDeck, setNewDeck] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const decks = useSelector((state) => state.decks.decks);
  const inputSearchCriteria = useSelector(
    (state) => state.decks.searchCriteria
  );

  const renderedDecks = decks
    .filter((deck) => deck.deckName.includes(inputSearchCriteria))
    .map((deck, index) => <Deck key={deck._id} deck={deck} index={index} />);

  useEffect(() => {
    console.log("decks", renderedDecks);
  }, [renderedDecks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({ deckName: newDeck, cards: [] });
    try {
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      await getDecks();
      setNewDeck("");
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  return (
    <div className="DeckContainer">
      <div className="formDiv">
        <div className="addNewDeck">
          <Card
            sx={{
              width: 345,
              borderRadius: "1rem",
              marginBottom: "5rem",
              backgroundColor: "#2d3956",
              padding: "1rem",
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  CB
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVert />
                </IconButton>
              }
              title="Cyrus Burns"
            />
            <CardMedia
              component="img"
              height="194"
              image="./assets/coolcards-user.jpeg"
              alt="coolcards"
            />
            <img src="./assets/codesmithLogoWhite.png" alt="codesmith" />
            <CardContent></CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <Favorite />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                  voluptatem at consequuntur?
                </Typography>
              </CardContent>
            </Collapse>
          </Card>

          <Card
            sx={{
              width: 345,
              borderRadius: "1rem",
              marginBottom: "5rem",
              backgroundColor: "#2d3956",
              padding: "1rem",
            }}
          >
            <CardHeader
              title="Create a flashcard deck"
              sx={{ color: "white" }}
            />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter deck name"
                  value={newDeck}
                  onChange={(e) => setNewDeck(e.target.value)}
                ></input>
                <button type="submit">Add</button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="deckSection">{renderedDecks}</section>
    </div>
  );
};
export default DeckContainer;
