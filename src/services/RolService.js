import {AxiosInstance} from "../config/axios-config";

class RolService {
    get(){
        return AxiosInstance.get("rol");
    }
}

export default new RolService();
