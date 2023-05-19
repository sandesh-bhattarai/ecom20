import ApiEndpoints from "../config/api-endpoints";
import HttpService from "./http.service";

class CategoryService extends HttpService{
    listAllCategories = async(params=null) => {
        try{
            // get request
            let response = await this.getRequest(ApiEndpoints.CATEGORY+"?"+params, {
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
                if(name === 'status' || name === 'parent') {
                    console.log("value", data[name])
                    if(data[name]){
                        formData.append(name, data[name].value ?? null);
                    }
                } else {
                    formData.append(name, data[name]);
                }
            }
        })   
        return formData 
    }

    createCategory = async (data) => {
        try{
            data = this.#dataMapping(data);
            let response = await this.postRequest(ApiEndpoints.CATEGORY, data, {login: true, files: true})
            return response;
        } catch(error) {
            throw error;
        }
    }

    deleteCategory = async(id) => {
        try{
            let response = await this.deleteRequest(ApiEndpoints.CATEGORY+"/"+id, {login:true});
            return response
        } catch(err) {
            throw err;
        }
    }

    getCategoryById = async (id) => {
        try {
            let response = await this.getRequest(ApiEndpoints.CATEGORY+"/"+id)
            return response;
        } catch(err){
            throw err;
        }
    }
    updateCategory = async (data, id) => {
        try {
            data = this.#dataMapping(data);
            let response = await this.patchRequest(ApiEndpoints.CATEGORY+"/"+id, data, {login: true, files: true});
            return response;
        } catch(err) {
            throw err;
        }
    }

    getCategoryForHomePage = async () => {
        try {
            let response = await this.getRequest(ApiEndpoints.CATEGORY+"/active/list");
            return response;
        } catch(err) {
            throw err;
        }
    }
}

const categorySvc = new CategoryService();
export default categorySvc;