import express from 'express';
import * as LessonController from '../controllers/lessonController.js';

const router = express.Router();

const initLessonRoute = (app) => {
    router.get('/lesson/getAll', LessonController.getAllLessons);
    router.get('/lesson/get/:id', LessonController.getLesson);
    router.post('/lesson/create', LessonController.createLesson);
    router.delete('/lesson/delete/:id', LessonController.deleteLesson);
    router.put('/lesson/update', LessonController.updateLesson);

    return app.use('/api/v1/', router);
};

export default initLessonRoute;
