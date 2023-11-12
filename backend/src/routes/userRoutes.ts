import {Router} from 'express';
import { loginUserController, registerUserController } from '../controllers/usersControllers';

const userRouter=Router();


userRouter.post('/register', registerUserController);
userRouter.post('/login',loginUserController);
userRouter.get('/',);
userRouter.get('/singleUser:userID',);
userRouter.get('/verifyDetails',);

export default userRouter;