import { Router } from "express";
import { bookTourController, createTourController, deleteTourController, getAllTourController, getBookedToursControllers, getSingleTourController, updateTourController } from "../controllers/toursControllers";
import { verifyToken } from "../middlewares/verifyToken";


const tourRouter=Router()

tourRouter.post('/create', createTourController);
tourRouter.get('/all', getAllTourController);
tourRouter.get('/single/:tourID', getSingleTourController);
tourRouter.post('/update/:tourID', updateTourController);
tourRouter.post('/book', verifyToken, bookTourController);
tourRouter.get('/bookedTours/:userID',  getBookedToursControllers)
tourRouter.delete('/:tourID', deleteTourController);

export default tourRouter