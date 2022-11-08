import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "config";
import sendConfirm from '../messages/confirmEmail.js';
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
        const hashPassword = await bcrypt.hash(user.password, 5);
        const createdUser = await User.create({...user, password: hashPassword});
        await createdUser.save();
        await sendConfirm(createdUser.id, createdUser.email);

        return createdUser;
    }

    async login(user) {
        const getUser = await User.findOne().or([{email: user.email}, {login: user.email}]);

        if(!getUser) {
            throw new Error('Пользователя с введенным логином или email не существует');
        }

        const isPasswordValid = bcrypt.compareSync(user.password, getUser.password);
        if(!isPasswordValid) {
            throw new Error('Не верный пароль');
        }
        
        if(!getUser.verify) {
            throw new Error('Для входа, необходимо подтвердить почту');
        }

        const token = jwt.sign({id: getUser.id}, config.get("secretKey"), {expiresIn: "1h"})

        return {
            token,
            user: {
                id: getUser.id,
                email: getUser.email,
                login: getUser.login,
                name: getUser.name,
                sname: getUser.sname,
                diskSpace: getUser.diskSpace,
                usedSpace: getUser.usedSpace
            }
        }
    }

    async confirm( { id } ) {
        const candidate = await User.findById(id);

        if(!candidate) {
            throw new Error('При подтверждении аккаунта произошла ошибка, попробуйте позже');
        }

        if(candidate.verify) {
            throw new Error('Этот аккаунт уже подтвержден');
        }

        candidate.verify = 1;
        await candidate.save();

        return {message: "Аккаунт успешно подтвержден, вы можете перейти к форме авторизации"};
    }
}

export default new AuthService();