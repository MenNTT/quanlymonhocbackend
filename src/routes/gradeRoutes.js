import express from 'express';
import * as GradeController from '../controllers/gradeController.js';

const router = express.Router();

const initGradeRoute = (app) => {
    router.get('/grade/getAll', GradeController.getAllGrades);
    router.get('/grade/get/:id', GradeController.getGrade);
    router.post('/grade/create', GradeController.createGrade);
    router.delete('/grade/delete/:id', GradeController.deleteGrade);
    router.put('/grade/update', GradeController.updateGrade);

    return app.use('/api/v1/', router);
}

export default initGradeRoute;
