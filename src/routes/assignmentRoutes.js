import express from 'express';
import * as AssignmentController from '../controllers/assignmentController.js';

const router = express.Router();

const initAssignmentRoute = (app) => {
    router.get('/assignment/getAll', AssignmentController.getAllAssignments);
    router.get('/assignment/get/:id', AssignmentController.getAssignment);
    router.post('/assignment/create', AssignmentController.createAssignment);
    router.delete('/assignment/delete/:id', AssignmentController.deleteAssignment);
    router.put('/assignment/update', AssignmentController.updateAssignment);

    return app.use('/api/v1/', router);
};

export default initAssignmentRoute;
