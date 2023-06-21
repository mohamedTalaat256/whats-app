import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios-client';




export const fetchUserChats = createAsyncThunk(
  "chats/fetchUserChats",
  async (userId) => {
    const response = await axiosClient.get('/chats/'+userId);


    //console.log(Object.values(response.data.data));
    return Object.values(response.data.data) ;
  }
);

