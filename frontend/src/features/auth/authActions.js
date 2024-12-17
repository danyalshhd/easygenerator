import { createAsyncThunk } from "@reduxjs/toolkit";
//import axios from 'axios'
import apiClient from "../axios";
//const baseUrl = 'http://localhost:3000/auth'

// Mock API calls
const fakeApi = (url, data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "error@example.com") reject("Invalid email or password");
      else resolve({ id: 1, name: "John Doe", email: data.email });
    }, 1000);
  });

// Login action
export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await apiClient.post(`/auth/signin`, credentials);
    debugger
    return response.data.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Signup action
export const signup = createAsyncThunk("/auth/signup", async (userData, thunkAPI) => {
  try {
    const response = await apiClient.post(`auth/signup`, userData);
    return response.data.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});
