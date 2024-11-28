import { v4 as uuidv4 } from 'uuid';
import sequelize from '../configs/connectDB.js';  
import { User, Account, Role, AccountRole } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { email, password, fullName, address, phoneNumber, birthDate } = req.body;

        // Validate required fields
        if (!email || !password || !fullName) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: 'Email, password and fullName are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Kiểm tra email đã tồn tại
        const existingAccount = await Account.findOne({ 
            where: { email },
            transaction 
        });

        if (existingAccount) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prepare user data
        const userData = {
            id: uuidv4(),
            fullName: fullName.trim(),
            address: address?.trim() || null,
            phoneNumber: phoneNumber?.trim() || null,
            birthDate: birthDate || null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Bước 1: Tạo User mới
        const newUser = await User.create(userData, { transaction });

        // Prepare account data
        const accountData = {
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            userId: newUser.id,
            createdAt: new Date()
        };

        // Bước 2: Tạo Account mới với userId từ User đã tạo
        const newAccount = await Account.create(accountData, { transaction });

        // Nếu tất cả thành công, commit transaction
        await transaction.commit();

        // Không trả về password trong response
        const responseData = {
            id: newUser.id,
            email: newAccount.email,
            fullName: newUser.fullName,
            phoneNumber: newUser.phoneNumber,
            address: newUser.address
        };

        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: responseData
        });

    } catch (error) {
        // Nếu có lỗi, rollback transaction
        await transaction.rollback();
        console.error('Registration error:', error);

        // Handle specific validation errors
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors.map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: 'Internal server error'
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find account with user and roles
        const account = await Account.findOne({
            where: { email },
            include: [
                {
                    model: User,
                    as: 'User'
                },
                {
                    model: Role,
                    as: 'Roles',
                    through: { attributes: [] }
                }
            ]
        });

        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, account.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // Get roles safely
        const roles = account.Roles?.map(role => role.name) || ['user'];

        // Create JWT token
        const token = jwt.sign(
            { 
                userId: account.User.id,
                email: account.email,
                roles: roles 
            },
            process.env.JWT_SECRET || '21h',
            { expiresIn: '24h' }
        );

        // Prepare user data
        const userData = {
            id: account.User.id,
            email: account.email,
            fullName: account.User.fullName,
            phoneNumber: account.User.phoneNumber || null,
            address: account.User.address || null,
            roles: roles
        };

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token,
            user: userData
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { fullName, phoneNumber, address, birthDate } = req.body;

        console.log('Request user from token:', req.user); // Debug log
        console.log('Params id:', id); // Debug log

        // Kiểm tra user tồn tại
        const user = await User.findOne({
            where: { id },
            include: [{
                model: Account,
                as: 'Account',
                attributes: ['email', 'userId']
            }]
        });

        if (!user) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Kiểm tra quyền update - userId trong token phải trùng với id của user
        if (req.user.userId !== id) {
            await transaction.rollback();
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to update this profile'
            });
        }

        // Validate và chuẩn bị data update
        const updateData = {
            ...(fullName && { fullName: fullName.trim() }),
            ...(phoneNumber && { phoneNumber: phoneNumber.trim() }),
            ...(address && { address: address.trim() }),
            ...(birthDate && { birthDate }),
            updatedAt: new Date()
        };

        // Update user
        await User.update(updateData, {
            where: { id }, // id chính là userId trong bảng Account
            transaction
        });

        // Lấy thông tin user sau khi update
        const updatedUser = await User.findOne({
            where: { id },
            include: [{
                model: Account,
                as: 'Account',
                attributes: ['email']
            }],
            transaction
        });

        await transaction.commit();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: updatedUser.id,
                email: updatedUser.Account.email,
                fullName: updatedUser.fullName,
                phoneNumber: updatedUser.phoneNumber,
                address: updatedUser.address,
                birthDate: updatedUser.birthDate
            }
        });

    } catch (error) {
        await transaction.rollback();
        console.error('Update profile error:', error);

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors.map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Update profile failed',
            error: 'Internal server error'
        });
    }
};