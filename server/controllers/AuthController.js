import AuthService from '../services/AuthService.js';
import {validationResult} from 'express-validator';

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: errors}); 
            }
            const {email, login, name, sname, password} = req.body;
            const user = await AuthService.register({email, login, name, sname, password});
            res.json(user);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await AuthService.login({email, password});
            res.json(user);
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}

export default new AuthController();