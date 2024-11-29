import express from 'express';
import * as CourseController from '../controllers/courseController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

const initCourseRoute = (app) => {
    router.get('/course/getAll', CourseController.getAllCourses);
    router.get('/course/get/:id', CourseController.getCourse);
    router.post('/course/create', CourseController.createCourse);
    router.delete('/course/delete/:id', CourseController.deleteCourse);
    router.put('/course/update', CourseController.updateCourse);
    
    // New routes for total revenue and recent courses
    router.get('/course/revenue', CourseController.getTotalRevenue);
    router.get('/course/recent', CourseController.getRecentCourses);

    // Thêm routes mới
    router.post('/enroll', verifyToken, CourseController.enrollCourse);
    router.get('/enrolled', verifyToken, CourseController.getEnrolledCourses);

    return app.use('/api/v1/', router);
};

export default initCourseRoute;
