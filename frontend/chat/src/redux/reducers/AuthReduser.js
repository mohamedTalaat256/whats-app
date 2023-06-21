import { createSlice } from "@reduxjs/toolkit";
import { login } from "../services/auth.service";


const LoginSlice = createSlice({
  name:"login",
  initialState: {data: {}, loading: false, error: null },
  reducers:{
    // your other reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      
    });
  },
});

export default LoginSlice.reducer;