import AuthService from '../services/AuthService.js';

class AuthController {
    async register(req, res) {
        try {
            const {email, login, name, sname, password} = req.body;
            const user = await AuthService.register({email, login, name, sname, password});
            res.json(user);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new AuthController();