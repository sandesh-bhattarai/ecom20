import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const CartSlicer = createSlice({
    name: "Cart",
    initialState: {
        list: null,
        totalItem: 0
    },
    reducers: {
        resetCart: (state, action) => {
            state.list = null;
            state.totalItem = 0
        },
        setCartList: (state, action) => {
            // {productId: 1, qty: 3}
            let currentItem = action.payload;   
            // [{productId: 1, qty: 2}]
            let cart = state.list ?? [];

            if(cart.length) {
                let index = null;
                cart.forEach((cartItem, ind) => {
                    if(cartItem.productId === currentItem.productId){
                        index = ind;
                    }
                })

                if(index === null) {
                    cart.push(currentItem)
                    // [{productId: 1, qty: 2},{productId: 2, qty: 1} ]
                } else {
                    // [{productId: 1, qty: 2},{productId: 2, qty: 1} ]
                        // {productId: 1, qty: 1}
                            //
                    if(currentItem.qty <= 0){
                        cart.splice(index, 1);
                        // [{productId: 2, qty: 1} ]
                    } else {
                        cart[index].qty = currentItem.qty;
                        // [{productId: 1, qty: 1},{productId: 2, qty: 1} ]
                    }
                }
            } else {
                // empty cart
                // state.totalItem = currentItem.qty;
                cart.push(currentItem)
            }
            // state populate
            state.list = cart

            // localstorage to persist the data 
            localStorage.setItem("cart", JSON.stringify(cart));
            cart.forEach((item) => {
                state.totalItem += Number(item.qty)
            })
            toast.success("Cart updated successfully...")
        },
        updateCart: (state, action) => {
            console.log("I am here")
            if(action.payload){
                let cart = action.payload
                state.list = cart 
                cart.forEach((item) => {
                    state.totalItem += Number(item.qty)
                })
            } else {

            }
        }   
    }
})

export const {setCartList, updateCart, resetCart} = CartSlicer.actions;
export default CartSlicer.reducer;