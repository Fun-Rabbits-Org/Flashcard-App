import React from "react";
import { useNavigate } from "react-router-dom";
import { getDecks } from "../../utils/requests";

import {
  Box,
  Typography,
  Chip,
  Card,
  Stack,
  Divider,
  Button,
  Checkbox,
  Fab,
} from "@mui/material";
import { Add, Clear } from "@mui/icons-material";

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
      <div>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 360,
            borderRadius: "1rem",
            border: "2px solid #2d3956",
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                {deck.deckName}
              </Typography>
              <Checkbox defaultUnChecked color="success" />
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {Math.floor(Math.random() * 100)} cards in this deck
            </Typography>
          </Box>
          <Divider light />
          <Box sx={{ p: 2 }} style={styles}>
            <Stack direction="row" spacing={1}>
              <Button onClick={handleDeckClick} sx={{ width: "auto" }}>
                <Add />
              </Button>
              <Button
                onClick={handleDelete}
                sx={{ width: "auto", marginLeft: 0 }}
              >
                <Clear />
              </Button>
            </Stack>
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default Deck;
