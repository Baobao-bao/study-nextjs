import { createSlice, configureStore } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: 1,
    users: {
      1: {
        userId: 1,
        username: 'Mike',
        color: 'blue',
        gender: 'male',
        videoCurrent: 25.0,
      },
    },
  },
  reducers: {
    updateCurrent: (state, action) => {
      console.log(action.payload);
      state.users[state.user].videoCurrent = action.payload;
    },
  },
});

export const { updateCurrent, setSocket } = userSlice.actions;

const store = configureStore({
  reducer: userSlice.reducer,
});

export default store;
