import express from 'express';
import * as NotificationController from '../controllers/notificationController.js';

const router = express.Router();

const initNotificationRoute = (app) => {
    router.get('/notification/getAll', NotificationController.getAllNotifications);
    router.get('/notification/get/:id', NotificationController.getNotification);
    router.post('/notification/create', NotificationController.createNotification);
    router.delete('/notification/delete/:id', NotificationController.deleteNotification);
    router.put('/notification/update', NotificationController.updateNotification);

    return app.use('/api/v1/', router);
};

export default initNotificationRoute;
