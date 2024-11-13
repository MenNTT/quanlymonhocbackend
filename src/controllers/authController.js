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
        
        // Tìm account và join với user
        const account = await Account.findOne({ 
            where: { email: email.toLowerCase().trim() },
            include: [{
                model: User,
                as: 'User',  // Phải match với tên alias trong association
                attributes: ['id', 'fullName', 'phoneNumber', 'address']
            }]
        });
        
        if (!account) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        // Kiểm tra password
        const isValidPassword = await bcrypt.compare(password, account.password);

        if (!isValidPassword) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { 
                userId: account.userId,
                email: account.email
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
                    address: account.User.address
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