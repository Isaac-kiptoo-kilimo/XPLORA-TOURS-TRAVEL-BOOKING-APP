import { Router } from "express";
import {  } from "../controllers/toursControllers";
import { createReviewController, deleteReviewController,getAllReviewsControllers, getUserReviewsControllers,updateReviewController } from "../controllers/reviewControllers";


const reviewRouter=Router()

reviewRouter.post('/create', createReviewController);
reviewRouter.get('/all', getAllReviewsControllers);
reviewRouter.get('/userReview/:userID/:tourID', getUserReviewsControllers);
reviewRouter.post('/update/:reviewID', updateReviewController);
reviewRouter.delete('/delete/:reviewID', deleteReviewController);

export default reviewRouter