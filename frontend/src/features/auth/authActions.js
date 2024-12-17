import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../axios";

// Login action
export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await apiClient.post(`/auth/signin`, credentials);
    return response?.data?.data?.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Signup action
export const signup = createAsyncThunk("/auth/signup", async (userData, thunkAPI) => {
  try {
    const response = await apiClient.post(`auth/signup`, userData);
    return response?.data?.data?.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});
