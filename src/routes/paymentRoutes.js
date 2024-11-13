import express from 'express';
import * as PaymentController from '../controllers/paymentController.js';

const router = express.Router();

const initPaymentRoute = (app) => {
    router.get('/payment/getAll', PaymentController.getAllPayments);
    router.get('/payment/get/:id', PaymentController.getPayment);
    router.post('/payment/create', PaymentController.createPayment);
    router.delete('/payment/delete/:id', PaymentController.deletePayment);
    router.put('/payment/update', PaymentController.updatePayment);

    return app.use('/api/v1/', router);
}

export default initPaymentRoute;
