import Cart from '../models/cart.js';
import Course from '../models/course.js';

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
            where: { 
                userId,
                isWishlist: false 
            },
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
    const { userId, courseId, isWishlist = false } = req.body;

    if (!userId || !courseId) {
        return res.status(400).json({
            success: false,
            message: 'Missing required parameters'
        });
    }

    try {
        const existingEntry = await Cart.findOne({
            where: { userId, courseId, isWishlist }
        });

        if (existingEntry) {
            return res.status(200).json({
                success: true,
                message: 'Item already in cart',
                data: existingEntry
            });
        }

        const newEntry = await Cart.create({
            userId,
            courseId,
            isWishlist
        });

        return res.status(201).json({
            success: true,
            message: 'Added to cart successfully',
            data: newEntry
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
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
