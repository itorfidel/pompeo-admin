import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "../services/types";
import { RootState } from "../app/store";
import { initialUser } from "../initialState";

const userSlice = createSlice({
  name: "user",
  initialState: { user: initialUser },
  reducers: {
    setUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = initialUser;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;
