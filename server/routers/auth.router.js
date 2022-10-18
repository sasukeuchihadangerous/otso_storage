import { Router } from "express";
import AuthController from '../controllers/AuthController.js';

const router = new Router();

router.post('/registration', AuthController.register);

export default router;