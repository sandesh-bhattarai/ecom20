import ApiEndpoints from "../config/api-endpoints";
import HttpService from "./http.service";

class OrderService extends HttpService{
    listCartDetail = async(data) => {
        try{

            let response = await this.postRequest(ApiEndpoints.ORDER+"/cartDetail", {cart: data})
            return response;
        } catch(err) {
            throw err;
        }
    }
    createAnOrder= async(data) => {
        try{

            let response = await this.postRequest(ApiEndpoints.ORDER,{cart: data}, {login: true})
            return response;
        } catch(err) {
            throw err;
        }
    }

}

const orderSvc = new OrderService();
export default orderSvc;