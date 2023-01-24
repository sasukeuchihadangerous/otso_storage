import { Router } from "express";
import AuthController from '../controllers/AuthController.js';
import {check} from 'express-validator';
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();

router.post('/registration',
    [
        check('email', "Неверный email").isEmail(),
        check('login', "Логин не должен быть пустым").isLength({min: 1}),
        check('password', "Пароль должен быть длинною 6-20 символов").isLength({min: 6, max: 20}),
    ],
    AuthController.register
);
router.post('/login', AuthController.login);
router.post('/confirm', AuthController.confirm);
router.get('/auth', authMiddleware, AuthController.auth);

router.post('/test', roleMiddleware(['USERR', 'USER']), AuthController.test);

export default router;