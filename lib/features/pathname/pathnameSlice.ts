import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PathnameState {
  value: string;
}

const initialState: PathnameState = {
  value: "",
};

export const pathnameSlice = createSlice({
  name: "pathname",
  initialState,
  reducers: {
    setPathname: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setPathname } = pathnameSlice.actions;
export default pathnameSlice.reducer;
