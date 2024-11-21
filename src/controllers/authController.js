import { v4 as uuidv4 } from 'uuid';
import sequelize from '../configs/connectDB.js';  
import { User, Account } from '../models/index.js';
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

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }
        
        // Find account and join with user
        const account = await Account.findOne({ 
            where: { email: email.toLowerCase().trim() },
            include: [{
                model: User,
                as: 'User',  // Must match the alias in association
                attributes: ['id', 'fullName', 'phoneNumber', 'address', 'role'] // Include role
            }]
        });
        
        if (!account) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, account.password);

        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { 
                userId: account.userId,
                email: account.email,
                role: account.User.role // Include role in token payload if needed
            },
            process.env.JWT_SECRET || '21h',
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: account.userId,
                    email: account.email,
                    fullName: account.User.fullName,
                    phoneNumber: account.User.phoneNumber,
                    address: account.User.address,
                    role: account.User.role // Include role in response
                }
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false, 
            message: 'Login failed',
            error: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { fullName, phoneNumber, address, birthDate } = req.body;

        // Kiểm tra user tồn tại
        const user = await User.findByPk(id);
        if (!user) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Kiểm tra quyền update (user chỉ được update thông tin của chính mình)
        if (user.id !== req.user.userId) {
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
            where: { id },
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