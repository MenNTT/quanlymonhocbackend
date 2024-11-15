import express from 'express';
import * as CourseController from '../controllers/courseController.js';

const router = express.Router();

const initCourseRoute = (app) => {
    router.get('/course/getAll', CourseController.getAllCourses);
    router.get('/course/get/:id', CourseController.getCourse);
    router.post('/course/create', CourseController.createCourse);
    router.delete('/course/delete/:id', CourseController.deleteCourse);
    router.put('/course/update', CourseController.updateCourse);

    return app.use('/api/v1/', router);
};

export default initCourseRoute;
