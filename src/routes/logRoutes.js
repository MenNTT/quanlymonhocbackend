import express from 'express';
import * as LogController from '../controllers/logController.js';

const router = express.Router();

const initLogRoute = (app) => {
    router.get('/log/getAll', LogController.getAllLogs);
    router.get('/log/get/:id', LogController.getLog);
    router.post('/log/create', LogController.createLog);
    router.delete('/log/delete/:id', LogController.deleteLog);
    router.put('/log/update', LogController.updateLog);

    return app.use('/api/v1/', router);
}

export default initLogRoute;
