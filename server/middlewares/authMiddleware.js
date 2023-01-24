import jwt from 'jsonwebtoken';
import ApiError from '../controllers/ErrorController.js';
import config from "config";

export default function (req, res, next) {
    if(req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return next(ApiError.UnauthorizedError());
        }
        const decodedData = jwt.verify(token, config.get("secretKey"));
        req.user = decodedData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}