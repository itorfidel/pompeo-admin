import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState: { isMenuOpen: false },
  reducers: {
    setisMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
  },
});

export const { setisMenuOpen } = mobileMenuSlice.actions;
export const selectMobileMenu = (state: RootState) =>
  state.mobileMenu.isMenuOpen;
export default mobileMenuSlice.reducer;
