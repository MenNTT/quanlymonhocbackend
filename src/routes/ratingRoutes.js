import express from 'express';
import * as RatingController from '../controllers/ratingController.js';

const router = express.Router();

const initRatingRoute = (app) => {
    router.get('/rating/getAll', RatingController.getAllRatings);
    router.get('/rating/get/:id', RatingController.getRating);
    router.post('/rating/create', RatingController.createRating);
    router.delete('/rating/delete/:id', RatingController.deleteRating);
    router.put('/rating/update', RatingController.updateRating);

    return app.use('/api/v1/', router);
}

export default initRatingRoute;
