import { createSlice } from "@reduxjs/toolkit";
import { fetchUserChats } from "./services/chat.servise";

const chatSlice = createSlice({
  name:"chat",
  initialState: {chats: [], loading: false, error: null},

  extraReducers: (builder) => {
    builder.addCase(fetchUserChats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserChats.fulfilled, (state, action) => {
      state.chats = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUserChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });


    
  },
});

export default chatSlice.reducer;