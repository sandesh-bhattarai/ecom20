import { Outlet } from "react-router-dom";
import HomeMenu from "../../component/home/menu.component";
import { useEffect } from "react";
import AppConstants from "../../config/constants";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../reducer/auth.reducer";
import {updateCart} from "../../reducer/cart.reducer";
const HomePageLayout = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        let token = localStorage.getItem(AppConstants.AUTH_KEY)
        if(token){
            dispatch(getLoggedInUser())
        }

        
    },[dispatch])
    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(cart) {
            dispatch(updateCart(cart))
        }
    },[])
    return (<>
        <HomeMenu />
        {/* Content */}
        <Outlet/>
        {/* footer section */}
    </>)
}

export default HomePageLayout;