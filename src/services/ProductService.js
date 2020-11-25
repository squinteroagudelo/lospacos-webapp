import {AxiosInstance} from "../config/axios-config";

class ProductService{
    get(){
        return AxiosInstance.get("products");
    }

    delete(id){
        return AxiosInstance.delete(`products/delete/${id}`);
    }
}

export default new ProductService();
