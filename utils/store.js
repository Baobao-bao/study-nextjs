import { createSlice, configureStore } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: 1,
    room: {
      id: '',
      name: '',
      isPrivate: false,
      max_member: 2,
      member_num: 0,
    },
    users: {
      // 1: {
      //   userId: 1,
      //   username: 'Mike',
      //   color: 'blue',
      //   gender: 'male',
      //   videoCurrent: 25.0,
      // },
    },
  },
  reducers: {
    updateCurrent: (state, action) => {
      console.log(action.payload);
      state.users[state.user].videoCurrent = action.payload;
    },
    addUser: (state, action) => {
      console.log('action.payload', action.payload);
      state.users[action.payload.userId] = action.payload;
      state.room.member_num += 1;
    },
    delUser: (state, action) => {
      delete state.users[action.payload];
      state.room.member_num -= 1;
    },
    setRoomId: (state, action) => {
      state.room.id = action.payload;
    },
  },
});

export const { updateCurrent, addUser, setRoomId } = userSlice.actions;

const store = configureStore({
  reducer: userSlice.reducer,
});

export default store;
