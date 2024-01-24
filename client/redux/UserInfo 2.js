import { createSlice } from '@reduxjs/toolkit';

const UserInfo = createSlice({
  name: 'user info',
  initialState: {
    userInfo: {}
  },
  reducers:{
    UserInfoReducer: (state, action) => {
      state.userInfo = action.payload
  }
  },
})

export const { UserInfoReducer } =
  UserInfo.actions;

export default UserInfo.reducer;