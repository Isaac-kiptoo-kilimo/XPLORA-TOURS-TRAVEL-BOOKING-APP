import {Request,Response, json} from 'express';
import Connection from '../dbHelpers/dbHelpers';
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { regUserValidation } from '../validators/validators';
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


// export const updateUserController = async (req: Request, res: Response) => {
//   try {
//     const { userID, fullName, email ,password} = req.body;
//     let hashedPwd=await bcrypt.hash(password , 5)

//     const { error } = validateUpdateuser.validate(req.body);
//     if (error)
//       return res
//         .status(400)
//         .send({ success: false, message: error.details[0].message });

//     const newUser: updateUser = {
//       userID,
//       fullName,
//       email,
//       password:hashedPwd,
//     };

//     const procedureName = "updateUser";
//     const params = newUser;
//     // console.log(params);

//     await dbhelpers.execute(procedureName, {params});
//     return res.send({ message: "User updated successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       error: (error as Error).message,
//       message: "Internal Sever Error",
//     });
//   }
// };

// export const getUser = async (req: Request, res: Response) => {
//     try {
//       const userID = req.params.userID;
//       // console.log(id);
//       if (!id) return res.status(400).send({ message: "Id is required" });
  
//       const { error } = validateuserId.validate(req.params);
  
//       if (error)
//         return res
//           .status(400)
//           .send({ success: false, message: error.details[0].message });
  
//       const procedureName = "getUserById";
//       const result = await dbhelpers.execute(procedureName, { userID });
  
//       res.json(result.recordset);
//     } catch (error) {
//       console.log(error);
//     }
//   };