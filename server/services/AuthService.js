import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "config";
import sendConfirm from '../messages/confirmEmail.js';
import ApiError from '../controllers/ErrorController.js';
class AuthService {
    async register(user) {
        const candidate = await User.findOne({email: user.email});
        const candidate2 = await User.findOne({login: user.login})

        if(candidate) {
            throw ApiError.BadRequest('Пользователь с введенным email уже существует');
        }
        if(candidate2) {
            throw ApiError.BadRequest('Пользователь с введенным логином уже существует');
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
            throw ApiError.BadRequest('Пользователя с введенным логином или email не существует');
        }

        const isPasswordValid = bcrypt.compareSync(user.password, getUser.password);
        if(!isPasswordValid) {
            throw ApiError.BadRequest('Не верный пароль');
        }
        
        if(!getUser.verify) {
            throw ApiError.BadRequest('Для входа, необходимо подтвердить почту');
        }

        const token = jwt.sign({id: getUser.id, role: getUser.role}, config.get("secretKey"), {expiresIn: "1h"})

        return {
            token,
            user: {
                id: getUser.id,
                email: getUser.email,
                login: getUser.login,
                name: getUser.name,
                sname: getUser.sname,
                role: getUser.role,
                diskSpace: getUser.diskSpace,
                usedSpace: getUser.usedSpace
            }
        }
    }

    async confirm( { id } ) {
        const candidate = await User.findById(id);

        if(!candidate) {
            throw ApiError.BadRequest('не верная ссылка для подтверждения аккаунта');
        }

        if(candidate.verify) {
            throw ApiError.BadRequest('Этот аккаунт уже подтвержден');
        }

        candidate.verify = 1;
        await candidate.save();

        return {message: "Аккаунт успешно подтвержден, вы можете перейти к форме авторизации"};
    }

    async auth(id) {
        const getUser = await User.findById(id);
        
        const token = jwt.sign({id: getUser.id, role: getUser.role}, config.get("secretKey"), {expiresIn: "1h"})

        return {
            token,
            user: {
                id: getUser.id,
                email: getUser.email,
                login: getUser.login,
                name: getUser.name,
                sname: getUser.sname,
                role: getUser.role,
                diskSpace: getUser.diskSpace,
                usedSpace: getUser.usedSpace
            }
        }
    }
}

export default new AuthService();