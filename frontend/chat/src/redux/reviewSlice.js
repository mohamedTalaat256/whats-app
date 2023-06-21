import { createSlice } from "@reduxjs/toolkit";
import { addProductReviews, deleteProductReviews, fetchProductReviews } from "./services/review.service";

const reviewSlice = createSlice({
  name:"review",
  initialState: {reviews: [], loading: false, error: null},

  extraReducers: (builder) => {
    builder.addCase(fetchProductReviews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;

      console.log(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchProductReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    ///////////////////////////////////////////////
    //////      add review                    /////
    //////////////////////////////////////////////

    builder.addCase(addProductReviews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProductReviews.fulfilled, (state, action) => {
     
     
      //console.log(action.payload)
      state.reviews.push(action.payload);
     state.loading = false;
      state.error = null;
    });
    builder.addCase(addProductReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });


     ///////////////////////////////////////////////
    //////      delete review                 /////
    //////////////////////////////////////////////

    builder.addCase(deleteProductReviews.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProductReviews.fulfilled, (state, action) => {
    console.log(action.payload);

     state.reviews = state.reviews.filter( el=> el.id !== action.payload);
     state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteProductReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    
  },
});

export default reviewSlice.reducer;