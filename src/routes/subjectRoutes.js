import express from 'express';
import * as SubjectController from '../controllers/subjectController.js';

const router = express.Router();

const initSubjectRoute = (app) => {
    router.get('/subject/getAll', SubjectController.getAllSubjects);
    router.get('/subject/get/:id', SubjectController.getSubject);
    router.post('/subject/create', SubjectController.createSubject);
    router.delete('/subject/delete/:id', SubjectController.deleteSubject);
    router.put('/subject/update', SubjectController.updateSubject);

    return app.use('/api/v1/', router);
};

export default initSubjectRoute;
