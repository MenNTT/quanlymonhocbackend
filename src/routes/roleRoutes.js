import express from 'express';
import * as RoleController from '../controllers/roleController.js';

const router = express.Router();

const initRoleRoute = (app) => {
    router.get('/role/getAll', RoleController.getAllRoles);
    router.get('/role/get/:id', RoleController.getRole);
    router.post('/role/create', RoleController.createRole);
    router.delete('/role/delete/:id', RoleController.deleteRole);
    router.put('/role/update', RoleController.updateRole);

    return app.use('/api/v1/', router);
}

export default initRoleRoute;
