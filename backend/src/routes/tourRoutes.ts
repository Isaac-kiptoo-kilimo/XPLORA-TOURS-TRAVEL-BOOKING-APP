import { Router } from "express";
import { bookTourControler, createTourController, deleteTourController, getAllTourController, getBookedToursControllers, getSingleTourController } from "../controllers/toursControllers";


const tourRouter=Router()

tourRouter.post('/create', createTourController);
tourRouter.get('/all', getAllTourController);
tourRouter.get('/single:tourID', getSingleTourController);
tourRouter.post('/book', bookTourControler);
tourRouter.get('/bookedTours/:userID', getBookedToursControllers)
tourRouter.delete('/:tourID', deleteTourController);

export default tourRouter