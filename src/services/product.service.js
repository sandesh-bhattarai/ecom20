import ApiEndpoints from "../config/api-endpoints";
import HttpService from "./http.service";

class ProductService extends HttpService{
    listAllProducts = async(params=null) => {
        try{
            // get request
            let response = await this.getRequest(ApiEndpoints.PRODUCT+"?"+params, {
                login: true,
            })
            return response;
        } catch(err) {
            throw err;
        }
    }

    // _ => protected
    // # => private

    #dataMapping = (data) => {
        
        let formData = new FormData()
        Object.keys(data).forEach((name, index) => {
            if(name === 'images') {
                data.images.forEach((image) => {
                    if(typeof image === 'object'){
                        formData.append('images', image, image.name)
                    }
                })
            } else {
                formData.append(name, data[name]);
            }
        })   
        return formData 
    }

    createProduct = async (data) => {
        try{
            data = this.#dataMapping(data);
            let response = await this.postRequest(ApiEndpoints.PRODUCT, data, {login: true, files: true})
            return response;
        } catch(error) {
            throw error;
        }
    }

    deleteProduct = async(id) => {
        try{
            let response = await this.deleteRequest(ApiEndpoints.PRODUCT+"/"+id, {login:true});
            return response
        } catch(err) {
            throw err;
        }
    }

    getProductById = async (id) => {
        try {
            let response = await this.getRequest(ApiEndpoints.PRODUCT+"/"+id)
            return response;
        } catch(err){
            throw err;
        }
    }
    getProductBySlug = async(slug) => {
        try {
            let response = await this.getRequest(ApiEndpoints.PRODUCT+"/"+slug)
            return response;
        } catch(err){
            throw err;
        }
    }
    updateProduct = async (data, id) => {
        try {
            data = this.#dataMapping(data);
            let response = await this.patchRequest(ApiEndpoints.PRODUCT+"/"+id, data, {login: true, files: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    getProductForHomePage = async () => {
        try {
            let response = await this.getRequest(ApiEndpoints.PRODUCT+"/active/list");
            return response;
        } catch(err) {
            throw err;
        }
    }
}

const productSvc = new ProductService();
export default productSvc;