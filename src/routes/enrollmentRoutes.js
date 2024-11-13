import express from 'express';
import * as EnrollmentController from '../controllers/enrollmentController.js';

const router = express.Router();

const initEnrollmentRoute = (app) => {
    router.get('/enrollment/getAll', EnrollmentController.getAllEnrollments);
    router.get('/enrollment/get/:id', EnrollmentController.getEnrollment);
    router.post('/enrollment/create', EnrollmentController.createEnrollment);
    router.delete('/enrollment/delete/:id', EnrollmentController.deleteEnrollment);
    router.put('/enrollment/update', EnrollmentController.updateEnrollment);

    return app.use('/api/v1/', router);
};

export default initEnrollmentRoute;
