import {AxiosInstance} from "../config/axios-config";

class PurchaseService{
    get(){
        return AxiosInstance.get("purchases");
    }
}

export default new PurchaseService();
