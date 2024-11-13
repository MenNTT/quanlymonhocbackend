import express from 'express';
import * as PermissionController from '../controllers/permissionController.js';

const router = express.Router();

const initPermissionRoute = (app) => {
    router.get('/permission/getAll', PermissionController.getAllPermissions);
    router.get('/permission/get/:id', PermissionController.getPermission);
    router.post('/permission/create', PermissionController.createPermission);
    router.delete('/permission/delete/:id', PermissionController.deletePermission);
    router.put('/permission/update', PermissionController.updatePermission);

    return app.use('/api/v1/', router);
}

export default initPermissionRoute;
