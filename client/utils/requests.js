import { store } from "../redux/store";
import { loadDecks } from "../redux/UserInfo";

export const getDecks = async () => {
  // try {
  //   const response = await fetch("http://localhost:3000");
  //   // console.log('---------- in fetch-----------')

  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch: ${response.statusText}`);
  //   }

  //   const body = await response.json();
  //   store.dispatch(loadDecks(body));
  // } catch (error) {
  //   console.error("Error during fetch:", error);
  // }

  const cards = store.userInfo.decks 
  store.dispatch(loadDecks(cards));
};
