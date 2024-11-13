// routes/userRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

const initAuthRoute = (app) =>{
    router.post('/auth/login',authController.login);
    router.post('/auth/register', authController.register);

    return app.use('/api/v1/', router);
}

export default initAuthRoute;
