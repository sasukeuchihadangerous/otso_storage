import axios from "axios";
const API_URL = 'http://localhost:8080/api/auth';

export default class AuthService {
    static async registration(data) {
        try {
            const response = await axios.post(API_URL + '/registration', {
                name: data.fname,
                sname: data.sname,
                email: data.email,
                login: data.login,
                password: data.password,
            }, 
            { withCredentials: true })
            return response; 
        } catch (e) {
            return e.response;
        }
    }
}