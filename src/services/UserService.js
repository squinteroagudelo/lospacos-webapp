import {AxiosInstance} from "../config/axios-config";

class UserService{
    get(){
        return AxiosInstance.get("users");
    }
}

export default new UserService();
