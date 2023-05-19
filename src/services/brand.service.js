import ApiEndpoints from "../config/api-endpoints";
import HttpService from "./http.service";

class BrandService extends HttpService{
    listAllBrands = async(params=null) => {
        try{
            // get request
            let response = await this.getRequest(ApiEndpoints.BRAND+"?"+params, {
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
            if(name === 'image') {
                if(typeof data['image'] === 'object'){
                    formData.append('image', data.image, data.image.name)
                }
            } else {
                formData.append(name, data[name]);
            }
        })   
        return formData 
    }

    createBrand = async (data) => {
        try{
            data = this.#dataMapping(data);
            let response = await this.postRequest(ApiEndpoints.BRAND, data, {login: true, files: true})
            return response;
        } catch(error) {
            throw error;
        }
    }

    deleteBrand = async(id) => {
        try{
            let response = await this.deleteRequest(ApiEndpoints.BRAND+"/"+id, {login:true});
            return response
        } catch(err) {
            throw err;
        }
    }

    getBrandById = async (id) => {
        try {
            let response = await this.getRequest(ApiEndpoints.BRAND+"/"+id)
            return response;
        } catch(err){
            throw err;
        }
    }
    updateBrand = async (data, id) => {
        try {
            data = this.#dataMapping(data);
            let response = await this.patchRequest(ApiEndpoints.BRAND+"/"+id, data, {login: true, files: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    getBrandForHomePage = async () => {
        try {
            let response = await this.getRequest(ApiEndpoints.BRAND+"/active/list");
            return response;
        } catch(err) {
            throw err;
        }
    }

    getProductsByBrandSlug = async(slug) => {
        try {
            let response = await this.getRequest(ApiEndpoints.BRAND+"/by-slug/"+slug);
            return response;
        } catch(error) {
            throw error;
        }
    }
}

const brandSvc = new BrandService();
export default brandSvc;