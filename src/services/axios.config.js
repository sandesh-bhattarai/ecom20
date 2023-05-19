import axios from "axios";
// import * as dotenv from "dotenv";
// dotenv.config()
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000,
    timeoutErrorMessage: "Server timed out...",
    headers: {
        "Content-Type": "application/json"
    }
});

// inteceptors 
// req generate 
// res receive

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if(error.code === "UNAUTHORIZED"){
            // TODO: Logout 
            throw error.response
        } else if(error.code === "FORBIDDEN") {
            // TODO: Error message dispaly
            throw error.response
        } else if(error.code === 'INTERNAL_SERVER_ERROR'){
            console.error("Internal server error: ", error)
        } else {
            throw error.response
        }
        // 400, 401, 403, 500
        // console.log("Interceptor: ", error)
    }
)

export default axiosInstance;