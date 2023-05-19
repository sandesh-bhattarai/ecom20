import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categorySvc from "../services/category.service";
import { toast } from "react-toastify";

export const getCategoriesList = createAsyncThunk(
    "Category/getCategoriesList",
    async (data="page=1&perPage=10", thunkAPI) => {
    try {
        let result = await categorySvc.listAllCategories(data)
        return result;
    } catch(err) {
        throw err
    }
})

export const createCategory = createAsyncThunk(
    "Category/createCategory",
    async(data, thunkAPI) => {
        try {
            let response = await categorySvc.createCategory(data);
            toast.success(response.msg);
            return response;
        } catch(error) {
            toast.error(error.response.msg);
            throw error
        }
    }
)

export const updateCategory = createAsyncThunk(
    "Category/updateCategory",
    async(data, thunkAPI) => {
        try {
            let response = await categorySvc.updateCategory(data.payload, data.id);
            toast.success(response.msg);
            return response.result;
        } catch(err) {
            console.error(err);
            toast.error("Sorry! Could not update at this moment")
            throw err;
        }
    }
)

export const deleteCategoryById = createAsyncThunk(
    "Category/deleteCategoryById",
    async(data=null, thunkAPI) =>{
        try {
            
            let res = await categorySvc.deleteCategory(data);
            return res;            
        } catch(error) {
            throw error
        }
    }
)

export const getCategoryDetail = createAsyncThunk(
    "Category/getCategoryDetail",
    async(data, thunkAPI) => {
        try{
            let response = await categorySvc.getCategoryById(data)
            return response;
        } catch(err) {
            throw err
        }
    }
)

const CategorySlicer = createSlice({
    name: "Category",
    initialState: {
        list: null,
        meta: null,
        detail: null
    },
    reducers:{
        getList: (state, action) => {

        },
        resetList: (state, action) => {
            state.list =  null
            state.meta= null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoriesList.fulfilled, (state, action) => {
            state.list= action.payload.result;
            state.meta = action.payload.meta;
            // window.location.href = window.location.href;
        })
        builder.addCase(getCategoriesList.rejected, (state, action) => {
            state.list = null;
        })
        builder.addCase(deleteCategoryById.fulfilled, (state, action) => {
            // let prevCats = state.list;
            // state.list = prevCats.filter((item) => !item._id === res.result._id)

        })
        builder.addCase(deleteCategoryById.rejected, (state, action) => {
            // 
        })

        builder.addCase(getCategoryDetail.fulfilled, (state, action) => {
            state.detail = action.payload.result;
        })

        builder.addCase(getCategoryDetail.rejected, (state, action) => {
            state.detail = null;
            console.error({action});
            toast.error("Error while fetching the detail...")
        })

        builder.addCase(updateCategory.fulfilled, (state, action) => {
            //
            state.list = null;
            state.meta = null;
            window.location.href = "/admin/category";
        })

        builder.addCase(updateCategory.rejected, (state, action) => {
            //
            console.log("State: ", action)
        })
    }
})

// export actions 
export const {getList, resetList} = CategorySlicer.actions
// export reducer
export default CategorySlicer.reducer;