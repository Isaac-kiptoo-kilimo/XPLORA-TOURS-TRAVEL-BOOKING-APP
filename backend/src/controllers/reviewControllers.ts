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
        if (reviews.length === 0) {
            return res.status(404).json({
                message: 'No reviews found at the moment.',
            });
        }

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
        if (!tourID || !userID) {
            return res.status(400).json({
                message: 'Both tourID and userID are required in the request parameters.',
            });
        }
        const reviews=(await dbhelpers.execute('getReviewsByUserAndTour',{tourID,userID})).recordset;

        if (reviews.length === 0) {
            return res.status(404).json({
                message: 'No reviews found for the specified user and tour.',
            });
        }

        return res.status(201).json(reviews)

    }catch(error){
        return res.json({
            error:error
        });
    }
}



export const updateReviewController = async (req: Request, res: Response) => {
    try {
        const { rating, comment } = req.body;
        const { reviewID } = req.params;

        const existingReview = await dbhelpers.execute('getReviewById', { reviewID });
        if (!Array.isArray(existingReview) || existingReview.length === 0) {
            return res.status(404).json({
                message: 'Review not found.',
            });
        }
                
        const updatedReviews = await dbhelpers.execute('updateReview', { rating, comment, reviewID });

        return res.status(200).json({
            message: 'Review updated successfully',
        });
    } catch (error:any) {
        return res.status(500).json({
            error: error.message || 'Internal Server Error',
        });
    }
};



export const deleteReviewController=async (req:Request,res:Response)=>{
    try{
        const {reviewID}=req.params
        if(!reviewID){
            return res.status(400).json({
                message: 'There is no review with such id',
            });
        }
        const deleteResults=await dbhelpers.execute('deleteReview',{reviewID})
        return res.status(201).json({
            message:"Deleted successfully"
        })

    }catch(error){
        return res.json({
            error:error
        })
    }
}