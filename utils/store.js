import { createSlice, configureStore } from '@reduxjs/toolkit';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    socket: socket,
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
    }
  },
});

export const { updateCurrent, setSocket } = userSlice.actions;

const store = configureStore({
  reducer: userSlice.reducer,
});

export default store;
