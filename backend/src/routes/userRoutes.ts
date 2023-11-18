import { Router , Request, Response} from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { checkCredentials, deleteUserController, getAllUsersControllers, getSingleUserController, getUserDetails, loginUserController, registerUserController, updateUserController } from '../controllers/usersControllers';

const userRouter=Router();

userRouter.post('/',()=>{
    console.log('running in the app');
    
});
userRouter.post('/register', registerUserController);
userRouter.post('/login', loginUserController);
userRouter.post('/updateUser/:userID', updateUserController);
userRouter.get('/',verifyToken,getAllUsersControllers);
userRouter.get('/details/:userID',verifyToken, getUserDetails);
userRouter.get('/checkUserDetails', verifyToken, checkCredentials);
userRouter.get('/singleUser/:userID',verifyToken,getSingleUserController)
userRouter.delete('/delete/:userID',deleteUserController)



export default userRouter;