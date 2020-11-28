import {AxiosInstance} from "../config/axios-config";

class ProductService{
    get(){
        return AxiosInstance.get("products");
    }

    delete(id){
        return AxiosInstance.delete(`products/${id}`);
    }

    create(product) {
        return AxiosInstance.post("products", product);
    }

    Edit(id,product){
        return AxiosInstance.put(`products/${id}`, product);
    }
}

export default new ProductService();
