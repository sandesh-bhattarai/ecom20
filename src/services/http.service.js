import AppConstants from "../config/constants";
import axiosInstance from "./axios.config";

class HttpService {
    
    headers = {}; 

    setHeaders = (config) => {
        if(config['files']) {
            this.headers['Content-Type'] = "multipart/form-data";
        } else {
            this.headers['Content-Type'] = 'application/json';
        }

        if(config['login']) {
            this.headers['Authorization'] = 'Bearer '+localStorage.getItem(AppConstants.AUTH_KEY);
        }

        if(config['params']){
            this.headers['params'] = config['params']
        }
    }
    postRequest = async (url, data, config={}) => {
        try {
            this.setHeaders(config)
            let response = await axiosInstance.post(url, data, {
                headers: this.headers
            });
            return response.data
        } catch(err) {
            console.log("HttpPostRequest, ", err)
            throw err;
        }
    }

    patchRequest = async (url, data, config={}) => {
        try {
            this.setHeaders(config)
            let response = await axiosInstance.patch(url, data, {
                headers: this.headers
            });
            return response.data
        } catch(err) {
            console.log("HttpPutRequest, ", err)
            throw err;
        }
    }

    getRequest = async (url, config = {}) =>{
        try {
            this.setHeaders(config)
            let response = await axiosInstance.get(url, {
                headers: this.headers
            })
            return response.data;
        } catch(err) {
            console.log("HttpGetRequest: ", err);
            throw err;
        }
    }

    deleteRequest = async (url, config = {}) =>{
        try {
            this.setHeaders(config)
            let response = await axiosInstance.delete(url, {
                headers: this.headers
            })
            return response.data;
        } catch(err) {
            console.log("HttpGetRequest: ", err);
            throw err;
        }
    }
}

export default HttpService;