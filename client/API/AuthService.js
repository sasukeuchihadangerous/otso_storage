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

    static async confirm(id) {
        try {
            const response = await axios.post(API_URL + '/confirm', {
                id: id,
            }, 
            { withCredentials: true })
            return response; 
        } catch (e) {
            return e.response;
        }
    }

    static async login(data) {
        try {
            const response = await axios.post(API_URL + '/login', {
                email: data.email,
                password: data.password,
            }, 
            { withCredentials: true })
            if(!response.data?.error) {
                localStorage.setItem('token', response.data.token);
            }
            return response; 
        } catch (e) {
            return e.response;
        }
    }

    static async auth() {
        try {
            const response = await axios.get(API_URL + '/auth', 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }, 
            { withCredentials: true })
            if(!response.data?.error) {
                localStorage.setItem('token', response.data.token);
            }
            return response; 
        } catch (e) {
            localStorage.removeItem('token');
            return e.response;
        }
    }
}