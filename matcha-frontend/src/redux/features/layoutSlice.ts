import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layout",
  initialState: { activeContent: "default" },
  reducers: {
    setActiveContent(state, action) {
      state.activeContent = action.payload;
    },
  },
});

export const { setActiveContent } = layoutSlice.actions;
export default layoutSlice.reducer;