import { useCallback } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import orderSvc from "../../../services/order.service";
import { resetCart } from "../../../reducer/cart.reducer";

const Checkout = () => {
    let cart = useSelector((rootStore) => {
        return rootStore.Cart?.list
    })
    const navigate = useNavigate();
    const createOrder = useCallback(async() => {
        if(cart) {
            //
            let response = await orderSvc.createAnOrder(cart);
            if(response.status) {
                toast.success(response.msg);
                localStorage.removeItem("cart")
                // dispatchEvent(resetCart(null));
                navigate("/")
            } else {
                toast.error(response.msg);
                navigate("/cart")
            }
        } else {
            navigate('/')
            toast.info("No items in the cart")
        }
    }, [])
    useEffect(() => {
        if(cart) {
            createOrder();
        }
    }, [cart])
    return (<>
    </>)
}

export default Checkout;