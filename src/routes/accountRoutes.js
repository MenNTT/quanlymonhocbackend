// routes/userRoutes.js
import express from 'express';
import * as AccountController from '../controllers/AccountController.js';

const router = express.Router();

const initAccountRoute = (app) =>{
    router.get('/account/getAll', AccountController.getAllAccounts);
    router.get('/account/get/:id', AccountController.getAccount);
    router.post('/account/create',AccountController.createAccount);
    router.delete('/account/delete/:id',AccountController.deleteAccount);
    router.put('/account/update',AccountController.updateAccount);

    return app.use('/api/v1/', router);
}

export default initAccountRoute;
    