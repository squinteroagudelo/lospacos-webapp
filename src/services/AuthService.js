import { AxiosInstance } from "../config/axios-config";

class AuthService {
    login(user){
        return AxiosInstance.post("user/login",user);
    }
}
export default new AuthService();