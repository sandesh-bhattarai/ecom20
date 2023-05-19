import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authSvc from "../pages/auth/auth.serivce";

export const getLoggedInUser = createAsyncThunk("User/getLoggedInUser", async(data = null, thunkAPI) => {
    try{
        let loggedUser = await authSvc.getLoggedInUser()
        return loggedUser.result;
    } catch(err) {
        throw err;
    }
})

const UserSlicer = createSlice({
    name: "User",
    initialState: {
        detail: null
    },
    reducers: {
        setDetail: (state, action) => {
            state.detail = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
            state.detail = action.payload;
        })

        builder.addCase(getLoggedInUser.rejected, (state, action) => {
            state.detail = null;
        })
    }
})

export const {setDetail} = UserSlicer.actions;
export default UserSlicer.reducer;