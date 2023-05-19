import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/auth.reducer";
import categoryReducer from "./reducer/catgory.reducer"
import cartReducer from "./reducer/cart.reducer";

const store = configureStore({
    reducer: {
        User: userReducer,
        Category: categoryReducer,
        Cart: cartReducer
    }
})

export default store;