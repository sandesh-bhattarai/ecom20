import ApiEndpoints from "../config/api-endpoints";
import HttpService from "./http.service";

class BannerService extends HttpService{
    listAllBanners = async(params=null) => {
        try{
            // get request
            let response = await this.getRequest(ApiEndpoints.BANNER+"?"+params, {
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

    createBanner = async (data) => {
        try{
            data = this.#dataMapping(data);
            let response = await this.postRequest(ApiEndpoints.BANNER, data, {login: true, files: true})
            return response;
        } catch(error) {
            throw error;
        }
    }

    deleteBanner = async(id) => {
        try{
            let response = await this.deleteRequest(ApiEndpoints.BANNER+"/"+id, {login:true});
            return response
        } catch(err) {
            throw err;
        }
    }

    getBannerById = async (id) => {
        try {
            let response = await this.getRequest(ApiEndpoints.BANNER+"/"+id)
            return response;
        } catch(err){
            throw err;
        }
    }
    updateBanner = async (data, id) => {
        try {
            data = this.#dataMapping(data);
            let response = await this.patchRequest(ApiEndpoints.BANNER+"/"+id, data, {login: true, files: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    getBannerForHomePage = async () => {
        try {
            let response = await this.getRequest(ApiEndpoints.BANNER+"/active/list");
            return response;
        } catch(err) {
            throw err;
        }
    }
}

const bannerSvc = new BannerService();
export default bannerSvc;