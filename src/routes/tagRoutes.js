import express from 'express';
import * as TagController from '../controllers/tagController.js';

const router = express.Router();

const initTagRoute = (app) => {
    router.get('/tag/getAll', TagController.getAllTags);
    router.get('/tag/get/:id', TagController.getTag);
    router.post('/tag/create', TagController.createTag);
    router.delete('/tag/delete/:id', TagController.deleteTag);
    router.put('/tag/update', TagController.updateTag);

    return app.use('/api/v1/', router);
}

export default initTagRoute;
