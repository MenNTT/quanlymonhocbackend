import express from 'express';
import * as UserController from '../controllers/userController.js';

const router = express.Router();

const initUserRoute = (app) => {
    router.get('/user/getAll', UserController.getAllUsers); // New route for getting all users
    // Add other user-related routes here

    return app.use('/api/v1/', router);
};

export default initUserRoute;