import ApiError from "../controllers/ErrorController.js";

export default function(err, req, res, next) {
    if(err instanceof ApiError) {
        return res.status(err.status).json({error: err.message, errors: err.errors});
    }
    console.log(err);
    return res.status(500).json({error: 'Произошла неизвестная ошибка, попробуйте позже'});
}