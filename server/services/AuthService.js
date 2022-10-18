import User from '../models/User.js';

class AuthService {
    async register(user) {
        const createdUser = await User.create(user);
        return createdUser;
    }
}

export default new AuthService();