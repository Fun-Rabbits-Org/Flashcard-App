import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDecks } from "../../utils/requests";

import {
  Box,
  Typography,
  Card,
  Stack,
  Divider,
  Button,
  Checkbox,
  TextField,
} from "@mui/material";
import { Add, Clear, Edit, Send } from "@mui/icons-material";

const Deck = ({ deck, index }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [editedDeckTitle, setEditedDeckTitle] = useState("");

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

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/deck/${deck._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ editedDeckTitle }),
      });

      if (response.status === 200) {
        getDecks();
      } else {
        console.log("Failed to edit deck:", response.statusText);
      }
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

  const randomColor =
    colorsArray[Math.floor(Math.random() * colorsArray.length + 1) - 1];

  const styles = {
    backgroundColor: randomColor,
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
              {isEdit ? (
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "Quicksand",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={handleDeckClick}
                >
                  {deck.deckName}
                </Typography>
              ) : (
                <TextField
                  onChange={(event) => {
                    setEditedDeckTitle(event.target.value);
                  }}
                  id="outlined-basic"
                  label="Enter new title"
                  variant="outlined"
                />
              )}
              <Checkbox defaultUnChecked color="success" />
            </Stack>

            {isEdit ? (
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ fontFamily: "Quicksand" }}
              >
                {Math.floor(Math.random() * 100)} cards in this deck
              </Typography>
            ) : null}
          </Box>
          <Divider />
          <Box sx={{ p: 2 }} style={styles}>
            <Stack direction="row" spacing={1}>
              <Button
                onClick={handleDeckClick}
                sx={{
                  ":hover": {
                    backgroundColor: "white",
                  },
                }}
              >
                <Add fontSize="medium" />
              </Button>
              <Button
                onClick={handleDelete}
                sx={{
                  ":hover": {
                    backgroundColor: "white",
                  },
                }}
              >
                <Clear fontSize="medium" />
              </Button>
              {isEdit ? (
                <Button
                  onClick={() => setIsEdit(!isEdit)}
                  sx={{
                    ":hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <Edit fontSize="medium" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleEdit();
                    setIsEdit(!isEdit);
                  }}
                  sx={{
                    ":hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <Send fontSize="medium" />
                </Button>
              )}
            </Stack>
          </Box>
        </Card>
      </div>
    </div>
  );
};

export default Deck;
