import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/CartController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

const initCartRoutes = (app) => {
    // Cart routes
    router.post('/add', verifyToken, addToCart);
    router.get('/:userId', verifyToken, getCart);
    router.delete('/remove/:id', verifyToken, removeFromCart);

    return app.use('/api/v1/cart', router);
};

export default initCartRoutes;
