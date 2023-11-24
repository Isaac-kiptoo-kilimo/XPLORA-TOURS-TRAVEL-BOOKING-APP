import {Request,Response, json} from 'express';
import Connection from '../dbHelpers/dbHelpers';
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { loginUserValidation, regUserValidation, validateUpdateuser } from '../validators/validators';
import { comparedPass } from '../utils/comparedPass';
import { ExtendedUser, verifyToken } from '../middlewares/verifyToken';
import { tokenGenerator } from '../utils/generateToken';
import { User, updateUser } from '../types/interfaces';
import { dbConfig } from '../config/db';
import mssql from 'mssql'
import jwt from 'jsonwebtoken'


const dbhelpers=new Connection;

export const registerUserController=async (req:Request,res:Response)=>{
    try{

        const {fullName,email,password}=req.body;
        let userID=v4()
        let hashedPassword=await bcrypt.hash(password , 5)
        const pool = await mssql.connect(dbConfig)

       
    let result = await pool.request()
    .input("userID", mssql.VarChar, userID) 
    .input("fullName", mssql.VarChar, fullName)
    .input("email", mssql.VarChar, email) 
    .input("password", mssql.VarChar, hashedPassword)
    .execute('registerUser')



    return res.status(200).json({
        message: 'User Registered Successfully'
    })
    
} catch (error) { 
    return res.json({
        error: error
    })
}


// try{
//     const {fullName,email,password}=req.body;
//     let userID=v4()

//     let hashedPassword=await bcrypt.hash(password , 5)


//     const { error }=regUserValidation.validate(req.body)

//     if(error){
//         return res.status(421).send({
//             error:"Use strong password, should be atleast 8 characters long with lowercase letters,symbols and uppercase"
//         })
//     }

//     let checkIfEmailExistProc="getUserByEmail"
//     const result=await dbhelpers.execute(checkIfEmailExistProc,{ email });
//     const userExist=result.recordset[0];

//     if(userExist){
//         return res.status(404).send({
//             error:"User with similar email exists"
//         })
//     }

   
//     const results=await dbhelpers.execute('registerUser',{userID,fullName,email,password:hashedPassword})

//     return res.status(201).json({
//         message:"User Registered Successfully",

//     })

// }catch(error){
//     return res.json({
//         error:error
//     })
// }
}


export const loginUserController=async (req:Request,res:Response)=>{
    try {
        const {email, password} = req.body

        const {error} = loginUserValidation.validate(req.body)

        if(error){
            return res.status(422).json({error: error.message})
        }

        const pool = await mssql.connect(dbConfig)

        let user = await (await pool.request().input("email", email).input("password", password).execute('loginUser')).recordset

        console.log(user);
        
        
        if(user[0]?.email  == email){
            const CorrectPwd = await bcrypt.compare(password, user[0]?.password)

            if(!CorrectPwd){
                return res.status(401).json({
                    error: "Incorrect password"
                })
            }

            const LoginCredentials = user.map(records =>{
                const {password,...rest}=records

                return rest
            })

            // console.log(LoginCredentials);

            // dotenv.config()
            const token = jwt.sign(LoginCredentials[0], process.env.SECRET as string, {
                expiresIn: '48h'
            }) 

            return res.status(200).json({
                message: "Logged in successfully", token
            })
            
        }else{
            return res.json({
                error: "Email not found"
            })
        }

    } catch (error) {
        return res.json({
            error: "Internal server error"
        })
    }
    // const checkEmailResult=await dbhelpers.execute('getUserByEmail',{email});

    // const existingUserWithEmail=checkEmailResult.recordset;
    // const user=existingUserWithEmail[0]

    // if(user){
    //     console.log(user);
        

    //     const validPass=await comparedPass(password,user.password)
    //     if(!validPass){
    //         console.log("pasword does not match");
            
    //         return res.status(404).json({
    //             error:"Password do not match"
    //         })
    //     }else{
    //         const token=tokenGenerator(
    //             user.userID,
    //             user.fullName,
    //             user.email,
    //             user.role
    //         )
    //         console.log(token);
    //         console.log("logged in successfully");
            
    //     return res.json({
    //         message:"logged in successfully",
    //         token      
            
    //     })
    //     }
        

        

    // }else{
    //     return res.status(404).json({
    //         error:"Account does not exist"
    //     })
    // }
}

export const checkCredentials=(req:ExtendedUser,res:Response)=>{
    if(req.info){
        return res.json({
            info: req.info
        })
    }
}

export const getUserDetails = async (req: ExtendedUser, res: Response) => {
    try {
        const user = req.info;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userID = user.userID; 
        const result = await dbhelpers.execute('GetUserDetails', { userID });
        const userDetails = result.recordset[0];

        if (!userDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }

        console.log(userDetails);
        
        return res.status(200).json(userDetails);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getAllUsersControllers=async(req:Request, res:Response)=>{
    try{
        // const users=(await dbhelpers.execute('fetchAllUsers')).recordset
        const pool= await mssql.connect(dbConfig);
        let users=(await pool.request().execute('fetchAllUsers')).recordset

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