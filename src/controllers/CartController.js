import Cart from '../models/Cart.js';
import Course from '../models/Course.js';

// Get cart items
export const getCart = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'User ID is required'
        });
    }

    try {
        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{
                model: Course,
                as: 'Course'
            }]
        });

        return res.status(200).json({
            success: true,
            data: cartItems
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Add to cart
export const addToCart = async (req, res) => {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
        return res.status(400).json({
            success: false,
            message: 'Missing required parameters'
        });
    }

    try {
        // Kiểm tra xem course có tồn tại không
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Kiểm tra xem item đã có trong giỏ hàng chưa
        const existingCartItem = await Cart.findOne({
            where: {
                userId,
                courseId
            }
        });

        if (existingCartItem) {
            return res.status(200).json({
                success: true,
                message: 'Item already in cart',
                data: existingCartItem
            });
        }

        // Thêm mới vào giỏ hàng
        const newCartItem = await Cart.create({
            userId,
            courseId
        });

        // Lấy thông tin đầy đủ của cart item bao gồm cả course
        const cartItemWithCourse = await Cart.findOne({
            where: { id: newCartItem.id },
            include: [{
                model: Course,
                as: 'Course'
            }]
        });

        return res.status(201).json({
            success: true,
            message: 'Item added to cart successfully',
            data: cartItemWithCourse
        });

    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Cart.destroy({
            where: { id }
        });

        if (deleted) {
            return res.status(200).json({
                success: true,
                message: 'Item removed from cart successfully'
            });
        }

        return res.status(404).json({
            success: false,
            message: 'Cart item not found'
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

// Add this new controller function
export const clearCart = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'User ID is required'
        });
    }

    try {
        await Cart.destroy({
            where: { 
                userId,
                // isWishlist: false ???
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Cart cleared successfully'
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
