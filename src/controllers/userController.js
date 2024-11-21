// src/controllers/userController.js
import User from '../models/user.js';
import Account from '../models/account.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Account,
                as: 'Account', // Đảm bảo rằng alias này khớp với alias được sử dụng trong các mối quan hệ mô hình của bạn
                attributes: ['email'] // Chỉ định các trường bạn muốn bao gồm từ mô hình Account
            }]
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};