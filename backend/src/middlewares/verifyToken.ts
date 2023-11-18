
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express';
dotenv.config();
import jwt from 'jsonwebtoken'
import { User } from '../types/interfaces';

export interface ExtendedUser extends Request{
    info?: User
}

export const verifyToken = (req:ExtendedUser, res:Response, next:NextFunction) =>{
    try {
        const token = req.headers['token'] as string

        if(!token){
            return res.status(404).json({
                message: "You do not have access"
            })
        }

        const data = jwt.verify(token, process.env.SECRET as string) as User

        req.info = data

        console.log('This is the req.info detaisl',data);
        
        
    } catch (error) {
        return res.json({
            message: error
        })
    }

    next();
}
