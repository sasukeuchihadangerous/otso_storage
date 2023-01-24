export default class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static ForbiddenError() {
        return new ApiError(403, 'Нет доступа')
    }

    static BadRequest(message) {
        return new ApiError(400, message)
    }
}