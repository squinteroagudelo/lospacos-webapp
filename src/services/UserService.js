import {AxiosInstance} from "../config/axios-config";

class UserService{
    get(){
        return AxiosInstance.get("user");
    }

    create(User){
        return AxiosInstance.post("user", User);
    }
}

export default new UserService();
