import { createSlice } from "@reduxjs/toolkit";
import { findUser } from "../thunk/userThunk";

const initialState ={
    user:null,
    isLoading: true,
    error:null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        updateUser : (state, action)=>{
            state.user = action.payload;
        },
        resetUser : (state)=>{
            state.user = null;
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(findUser.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(findUser.fulfilled, (state, action)=>{
            state.user = action.payload;
            state.isLoading = false;
        })
        .addCase(findUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export const {updateUser, resetUser} = userSlice.actions;

export default userSlice.reducer;