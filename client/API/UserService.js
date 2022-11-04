import axios from "axios";

export default class UserService {
    /*static async login(data) {
        const response = await axios.post('http://dapsymetrics.beknazaryanstudio.ru:8080/auth/login', {
            email: data.email,
            password: data.password,
        }, 
        { withCredentials: true })
        return response; 
    }*/
    static async getmytests() {
        const response = await axios.get('https://dapsy-pro.ru:8080/user/getmytests', { withCredentials: true })
        return response; 
    }
    static async gettests() {
        const response = await axios.get('https://dapsy-pro.ru:8080/user/gettests', { withCredentials: true })
        return response; 
    }
    static async addtest(data) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/addtest', {
            title: data.title,
            anon: data.anon,
            tests: data.tests,
        }, 
        { withCredentials: true })
        return response; 
    }
    static async edittest(data) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/edittest', {
            title: data.title,
            anon: data.anon,
            link: data.link,
            tests: data.tests,
        }, 
        { withCredentials: true })
        return response; 
    }
    static async validtest(id) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/validtest', {
            id: id,
        }, 
        { withCredentials: true })
        return response; 
    }
    static async validtest2(id) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/validtest2', {
            id: id,
        }, 
        { withCredentials: true })
        return response; 
    }
    static async getquestions(tests, sex) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/getquestions', {
            tests: tests,
            sex: sex,
        }, 
        { withCredentials: true })
        return response; 
    }
    static async gettestinfo(id, page) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/gettestinfo', {
            id: id,
            page: page,
        }, 
        { withCredentials: true })
        return response; 
    }
    static async getmaxpages(id) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/getmaxpages', {
            id: id,
        }, 
        { withCredentials: true })
        return response; 
    }
    static async removetest(id) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/removetest', {
            id: id,
        }, 
        { withCredentials: true })
        return response; 
    }
    static async sendresult(info, data, id) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/sendresult', {
            name: info.name,
            sname: info.sname,
            email: info.email,
            report: data,
            test_id: id,
        }, 
        { withCredentials: true })
        return response; 
    }
    static async pdf_generate(rep, rep2) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/pdf-generate', {
            report: rep,
            name: rep2.name,
            sname: rep2.sname,
            email: rep2.email
        }, 
        { withCredentials: true })
        return response; 
    }
    static async pdf_get() {
        const response = await axios.get('https://dapsy-pro.ru:8080/user/pdf-get', { responseType: 'blob' })
        return response; 
    }
    static async sendmessage(data) {
        const response = await axios.post('https://dapsy-pro.ru:8080/user/sendmessage', {
            name: data.name,
            phone: data.phone,
            email: data.email,
            message: data.message,
        }, 
        { withCredentials: true })
        return response; 
    }
}

