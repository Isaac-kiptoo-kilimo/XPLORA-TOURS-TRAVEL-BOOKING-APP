import {Request,Response, json} from 'express';
import Connection from '../dbHelpers/dbHelpers';
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { regUserValidation, validateUpdateuser } from '../validators/validators';
import { comparedPass } from '../utils/comparedPass';
import { ExtendedUser, verifyToken } from '../middlewares/verifyToken';
import { tokenGenerator } from '../utils/generateToken';
import { User, updateUser } from '../types/interfaces';


const dbhelpers=new Connection;

export const registerUserController=async (req:Request,res:Response)=>{

try{
    const {fullName,email,password}=req.body;
    let userID=v4()

    let hashedPassword=await bcrypt.hash(password , 5)


    const { error }=regUserValidation.validate(req.body)

    if(error){
        return res.status(421).send({
            error:"Use strong password, should be atleast 8 characters long with lowercase letters,symbols and uppercase"
        })
    }

    let checkIfEmailExistProc="getUserByEmail"
    const result=await dbhelpers.execute(checkIfEmailExistProc,{ email });
    const userExist=result.recordset[0];

    if(userExist){
        return res.status(404).send({
            error:"User with similar email exists"
        })
    }

   
    const results=await dbhelpers.execute('registerUser',{userID,fullName,email,password:hashedPassword})

    return res.status(201).json({
        message:"User Registered Successfully",

    })

}catch(error){
    return res.json({
        error:error
    })
}
}


export const loginUserController=async (req:Request,res:Response)=>{
    const { email, password }=req.body;

    const checkEmailResult=await dbhelpers.execute('getUserByEmail',{email});

    const existingUserWithEmail=checkEmailResult.recordset;
    const user=existingUserWithEmail[0]

    if(user){
        console.log(user);
        

        const validPass=await comparedPass(password,user.password)
        const token=tokenGenerator(
            user.userID,
            user.fullName,
            user.email,
            user.role
        )

        console.log(token);

        return res.json({
            message:"logged in successfully",
            token      
            
        })

    }else{
        return res.status(404).json({
            error:"Account does not exist"
        })
    }
}

export const checkCredentials=(req:ExtendedUser,res:Response)=>{
    if(req.info){
        return res.json({
            info: req.info
        })
    }
}


export const getUserDetails=async(req:Request,res:Response)=>{

    try {

       const userID =req.params.userID
       console.log(userID);       
    
        const result = await dbhelpers.execute('GetUserDetails',{userID});
        const userDetails = result.recordset[0];

        console.log(userDetails);
        
        if (!userDetails) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.json(userDetails);

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}



export const getAllUsersControllers=async(req:Request, res:Response)=>{
    try{
        const users=(await dbhelpers.execute('fetchAllUsers')).recordset

        return res.status(201).json(users)
    }catch(error){
        return res.json({
            error:error
        })
    }
}



export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { fullName, email } = req.body;
    const {userID}=req.params

    const { error } = validateUpdateuser.validate(req.body);
    if (error)
      return res.status(403).json({ success: false, message: error.details[0].message });
     
    // console.log(updatedUser);

    const updatedUser=await dbhelpers.execute('updateUser', {userID,fullName,    email});

    return res.json({ 
        message: "User updated successfully" 
    });


  } catch (error) {

    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
};



export const getSingleUserController = async (req: Request, res: Response) => {
    try {
      const userID = req.params.userID;
      console.log(userID);
      if (!userID) return res.status(403).send({ message: "Id is required" });
  
      
      const result = await dbhelpers.execute('getSingleUser', { userID });
  
      res.json(result.recordset);
      
    } catch (error) {
      return res.json(400).json({
        error:error
      })
    }
  };

  export const deleteUserController=async(req:Request,res:Response)=>{
    try{
        const {userID}=req.params

        const deleteUser=await dbhelpers.execute('deleteUser',{userID})
        return res.json({
            message:'User deleted successfully'
        })
    }catch(error){
        return res.json({
            error:error
        })
    }
  }

  export const resetPasswordControllers=(req:Request,res:Response)=>{
    try{

    }catch(error){
        return res.json({
            error:error
        })
    }
  }

  export const forgotPasswordController=(req:Request,res:Response)=>{
    try{

    }catch(error){
         return res.json({
            error:error
        })
    }
  }