import { store } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";


const Authorize = async() =>{
  try {
    const response = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const user = response.json()
    if (user!=="Can't find"){
    store.dispatch(login(true));
    store.dispatch(UserInfoReducer(user))
    }
    
  } catch (error) {;
    console.log('error user not found')
    // store.dispatch(login(true));
    // store.dispatch(UserInfoReducer(user))
  }
}

export default Authorize