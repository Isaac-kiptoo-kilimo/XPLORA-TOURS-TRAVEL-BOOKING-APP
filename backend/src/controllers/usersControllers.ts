import {Request,Response, json} from 'express';
import Connection from '../dbHelpers/dbHelpers';
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { regUserValidation } from '../validators/validators';
import { comparedPass } from '../utils/comparedPass';
import { verifyToken } from '../middlewares/verifyToken';
import { tokenGenerator } from '../utils/generateToken';


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

        const validPass=await comparedPass(password,user.password)
        const token=tokenGenerator(
            user.userID,
            user.fullName,
            user.email,
            user.role
        )

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