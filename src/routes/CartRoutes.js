import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

// Thêm vào giỏ hàng hoặc danh sách yêu thích
router.post('/cart', addToCart);

// Lấy giỏ hàng hoặc danh sách yêu thích
router.get('/cart', getCart);

// Xóa khỏi giỏ hàng hoặc danh sách yêu thích
router.delete('/cart', removeFromCart);

export default router;
