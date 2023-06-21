import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios-client';

export const login = createAsyncThunk(
  "/login",
  async (formData) => {
    const response = await axiosClient.post('/admin/auth/login', formData);

    //console.log(response.data);
    return response.data;
  }
);

