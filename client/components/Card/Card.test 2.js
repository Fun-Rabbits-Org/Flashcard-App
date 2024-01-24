/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/react";
import Card from "./Card";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import configureStore from 'redux-mock-store';


const mockStore = configureStore();

const initialState = {
  decks: {
    decks: []
  },
  currentDeck: {
    id: "mockDeckId",
    cards: [
      { _id: 'cardId1', front: 'Mock Front 1', back: 'Mock Back 1' },
    ]
  },
  login: {
    isLoggedIn: true
  },
  user: {
    userInfo: {}
  }
};

const newStore = mockStore(initialState);


// Describe the set of tests for the Card component
describe("Card Component Tests", () => {

  // Test rendering
  // test("renders Card component", () => {
  //   // Render the Card component with mocked data and index 0
  //   render(
  //     <Provider store={newStore}>
  //       <Card/>
  //     </Provider>
  //   );
  // });

  // Test card flipping
  test("flips card between front and back when clicked", () => {
    // Render the Card component with mocked data and index 0
    render(
      <Provider store={newStore}>
        <Card />
      </Provider>
    );

    // Get the element representing the front of the card
    const flashCard = screen.getByText((contents, element) => {
      //Will have to figure out what part of element you require to match below.
      return element.someContent === "Mock Front 1";
    });
    // Simulate a click event on the front of the card
    fireEvent.click(flashCard);
    // Expect the back of the card to be in the document
    expect(screen.getByText("Mock Back 1")).toBeInTheDocument();
  });

  // // Test navigation buttons
  // test("updates index and resets card on back and next button click", async () => {
  //   // Render the Card component with mocked data and index 0
  //  render(
  //     <Provider store={newStore}>
  //       <Card />
  //     </Provider>
  //   );

  //   expect(await screen.getByRole("button", { name: "Back" }));
    

  //   // Get the back and next buttons by their roles
  //   const backButton = screen.getByRole('button', { name: 'Back' });
  //   const nextButton = screen.getByRole('button', { name: 'Next' });

  //   // Simulate a click event on the next button
  //   fireEvent.click(nextButton);
  //   // Expect the back button to be enabled after clicking next
  //   expect(backButton).toBeEnabled();
  //   // Simulate a click event on the back button
  //   fireEvent.click(backButton);
  //   // Expect the next button to be enabled after clicking back
  //   expect(nextButton).toBeEnabled();
  // });

  // // Test delete functionality
  // test("deletes a card on delete button click", () => {
  //   // Render the Card component with mocked data and index 0
  //   render(
  //     <Provider store={newStore}>
  //       <Card />
  //     </Provider>
  //   );

  //   // Get the delete button by its role
  //   const deleteButton = screen.getByRole("button", { name: "Delete" });
  //   // Simulate a click event on the delete button
  //   fireEvent.click(deleteButton);

  //   // Expect a fetch request to be made with the correct arguments
  //   expect(fetch).toHaveBeenCalledWith(
  //     "http://localhost:3000/deck/mockDeckId/card",
  //     {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: expect.any(String),
  //     }
  //   );
  // });
});
