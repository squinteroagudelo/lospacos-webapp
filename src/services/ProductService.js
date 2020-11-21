import {AxiosInstance} from "../config/axios-config";

class ProductService{
    get(){
        return AxiosInstance.get("products");
    }
}

export default new ProductService();
