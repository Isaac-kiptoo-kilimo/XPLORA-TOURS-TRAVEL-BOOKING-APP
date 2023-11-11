import express, { json,Response,Request,NextFunction } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();


const app=express();

app.use(json());
app.use(cors)


app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
    res.json({
        message:error
    })

})

const port=process.env.PORT || 4300;

app.listen(port,()=>{
    console.log(`App is running at ${port}`);
    
});


