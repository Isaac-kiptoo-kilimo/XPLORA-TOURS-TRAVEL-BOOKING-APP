import express , {Request, Response} from 'express'
import Connection from '../dbHelpers/dbHelpers'
import {v4} from 'uuid'
import { dbConfig } from '../config/db'
import mssql from 'mssql'
import { Tour } from '../types/interfaces'

const dbhelpers=new Connection

export const createTourController= async(req:Request,res:Response)=>{
   
   try{ const {name,description,destination,price,type,startDate,endDate,duration}=req.body;
    const tourID=v4()


    const tour=await dbhelpers.execute('createTours',{ tourID, name,description,destination,price,type,startDate,endDate,duration})
    // console.log(tour.recordset);
    // console.log(tour);
    
    
    return res.status(201).json({
        messge:"Created tour Successfully"
    })}catch(error)
{
    return res.json({
        error:error
    })
}
}


export const getAllTourController= async(req:Request,res:Response)=>{
    try{
        const pool= await mssql.connect(dbConfig);
        let tours=(await pool.request().execute('fetchAllTours')).recordset
        //    console.log(tours);

        return res.status(200).json(tours)

    }catch(error){
        return res.json({
            error: error
        })
    }
}


export const  getSingleTourController=async (req:Request,res:Response)=>{
    try{

          const {tourID}=req.params;

          console.log(tourID);
          const data = {
                tourID: tourID,
              };
              const tour = await dbhelpers.execute('getSingleTour', data);
         return res.json(tour.recordset)
          
        

    }catch(err){
          console.log(err)

    }

}

// export const getTour = async (req: Request, res: Response) => {
//     try {
//       const tour_id = req.params.tour_id;
//       // console.log(id);
//       if (!tour_id) return res.status(400).send({ message: "Id is required" });
  
//       const { error } = validateTourId.validate(req.params);
  
//       if (error)
//         return res
//           .status(400)
//           .send({ success: false, message: error.details[0].message });
  
//       const procedureName = "getTourById";
//       const result = await execute(procedureName, { tour_id });
  
//       res.json(result.recordset);
//     } catch (error) {
//       console.log(error);
//       res.status(404).send({ message: "internal server error" });
//     }
//   };

// export const updateTour = async (req: Request, res: Response) => {
//     try {
//       const { tour_id, tour_name, tour_description, dueDate } = req.body;
  
//       const { error } = validateUpdateTour.validate(req.body);
//       if (error)
//         return res.status(400).send({ message: "please put correct details" });
  
//       const newTour: Tour = {
//         tour_id,
//         tour_name,
//         tour_description,
//         dueDate,
//       };
  
//       const ProcedureName = "updateTour";
//       const params = newTour;
  
//       await execute(ProcedureName, params);
  
//       return res.status(200).send({ message: "Tour updated successfully" });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         error: (error as Error).message,
//         message: "Internal Sever Error",
//       });
//     }
//   };

export const deleteTourController=async(req:Request,res:Response)=>{
    try{
        let {tourID}=req.params

        let data={
            tourID:tourID,
        }
        // console.log(data)

        if(!data){
            return res.status(422).json({
                message:"Already deleted"
            })
        }else{
            let result=await dbhelpers.execute('deleteTour',data)
        
            return res.status(200).json({
                message:'Deleted successfully'
            })
        }
        

    }catch(error){
        console.log(error)
        return res.status(201).json({
            message: "Error in deleting the tour"
        })
    }
}

export const bookTourControler= async(req:Request,res:Response)=>{
    try{
        const {userID,tourID}=req.body;
        const bookingID=v4()
        console.log(userID);
        

        const result=await dbhelpers.execute('bookingTour',{userID,tourID,bookingID})
        console.log(result);
        
        if (result.rowsAffected[0] === 1) {
            return res.status(200).json({message:'Tour booked successfully'});
          } else {
            return res.status(404).json({message:'User not found'});
          }

    }catch(error){
        console.error('Error booking tour', error);        
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getBookedToursControllers= async(req:Request,res:Response)=>{
    try{
        const {userID}=req.params;
        const results=await dbhelpers.execute('getBookedTours',{userID})
        console.log('getting booked tours successfully');
        
        return res.status(200).json(results.recordset);
    }catch(error){
        console.error('Error in getting booked tour', error);        
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}