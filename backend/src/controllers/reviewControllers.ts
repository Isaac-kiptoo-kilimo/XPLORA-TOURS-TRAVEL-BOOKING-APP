import express , {Request, Response} from 'express';
import Connection from '../dbHelpers/dbHelpers';
import {v4} from 'uuid';
import { dbConfig } from '../config/db';
import mssql from 'mssql';


const dbhelpers=new Connection;

export const createReviewController= async(req:Request,res:Response)=>{
try{
    const { userID, tourID,rating,comment}=req.body

    let reviewID=v4()

    const result=await dbhelpers.execute('createReviewTour',{reviewID,userID, tourID,rating,comment})
    console.log(result.recordset);
    
    return res.status(201).json({
        message:"review created Successfully"
    })

}catch(error){
    return res.json({
        error:error
    })
}
};


export const getAllReviewsControllers=async (req:Request,res:Response)=>{
    try{
        
        const reviews=(await dbhelpers.execute('getAllReviews')).recordset;

        return res.status(201).json(reviews)

    }catch(error){
        return res.json({
            error:error
        });
    }
}

export const getUserReviewsControllers=async (req:Request,res:Response)=>{
    try{
        const {tourID,userID}=req.params
        if(!tourID ){
            return res.send({
                message:'The Tour/event does not exist'
            })
        }else{
            const reviews=(await dbhelpers.execute('getReviewsByUserAndTour',{tourID,userID})).recordset;

            return res.status(201).json(reviews)
        }
        

    }catch(error){
        return res.json({
            error:error
        });
    }
}



export const updateReviewController= async(req:Request,res:Response)=>{
    try{
        const {rating,comment }=req.body
        const {reviewID}=req.params
        await dbhelpers.execute('',{rating,comment,reviewID})
        res.status(200).send('Review updated successfully');
    }catch(error){
        return res.json({
            error:error
        })
    }
}


export const deleteReviewController=async (req:Request,res:Response)=>{
    try{
        const {reviewID}=req.params

        const deleteResults=await dbhelpers.execute('',{reviewID})
        return res.status(201).json({
            message:"Deleted successfully"
        })

    }catch(error){
        return res.json({
            error:error
        })
    }
}