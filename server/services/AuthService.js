import User from '../models/User.js';
import bcrypt from 'bcrypt';

class AuthService {
    async register(user) {
        const candidate = await User.findOne({email: user.email});
        const candidate2 = await User.findOne({login: user.login})

        if(candidate) {
            throw new Error('Пользователь с введенным email уже существует');
        }
        if(candidate2) {
            throw new Error('Пользователь с введенным логином уже существует');
        }
        const hashPassword = await bcrypt.hash(user.password, 10);
        const createdUser = await User.create({...user, password: hashPassword});
        await createdUser.save();
        return createdUser;
        
    }
}

export default new AuthService();