import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import * as EnrollmentController from '../controllers/EnrollmentController.js';

const router = express.Router();

const initEnrollmentRoutes = (app) => {
    router.post('/enroll', verifyToken, EnrollmentController.enrollCourse);
    router.get('/user', verifyToken, EnrollmentController.getUserEnrollments);
    // ... other routes

    return app.use('/api/v1/enrollment', router);
};

export default initEnrollmentRoutes;
