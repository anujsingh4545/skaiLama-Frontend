import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "../../services/authService";

export const findUser = createAsyncThunk('user/findUser',async(_, thunkAPI)=>{
    const response = await getUserDetails();
    if (!response.success) {
        return thunkAPI.rejectWithValue(response.message);
      }
    return response.data;
})