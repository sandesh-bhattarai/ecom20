import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authSvc from "../pages/auth/auth.serivce";
import AppConstants from "../config/constants";
import LoadingComponent from "../component/loading/loading.component"
import { useDispatch } from "react-redux";
import {setDetail} from "../reducer/auth.reducer"
const PrivateRoutes = ({children, toCheck}) => {
    let [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUser = useCallback(async () => {
        try{
            let response = await authSvc.getLoggedInUser();
            if(response.result.role === toCheck) {
                dispatch(setDetail(response.result))
                setLoading(false);
            } else {
                toast.warning("You do not have previlige to access this Route")
                navigate("/"+response.result.role)
            }
        } catch(err) {
            console.log(err)
        }
    }, [ toCheck, navigate, dispatch])

    useEffect(() => {
        let token = localStorage.getItem(AppConstants.AUTH_KEY);
        if(!token){
            toast.warning("Please login first")
            navigate("/login")
        } else {
            getUser();
        }
    }, [getUser, navigate])
    
    return loading ? <LoadingComponent /> : children;
}
export default PrivateRoutes;