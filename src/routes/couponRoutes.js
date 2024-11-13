import express from 'express';
import * as CouponController from '../controllers/couponController.js';

const router = express.Router();

const initCouponRoute = (app) => {
    router.get('/coupon/getAll', CouponController.getAllCoupons);
    router.get('/coupon/get/:id', CouponController.getCoupon);
    router.post('/coupon/create', CouponController.createCoupon);
    router.delete('/coupon/delete/:id', CouponController.deleteCoupon);
    router.put('/coupon/update', CouponController.updateCoupon);

    return app.use('/api/v1/', router);
}

export default initCouponRoute;
