import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../app/store';

interface UserState {
  value: string;
}

const initialState: UserState = {
  value: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userUpdated: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const {userUpdated} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
