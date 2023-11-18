import express, { json ,Request,Response,NextFunction} from "express";
import dotenv from 'dotenv'

import cors from "cors"
import userRouter from "./routes/userRoutes";
import tourRouter from "./routes/tourRoutes";
import reviewRouter from "./routes/reviewRoutes";


dotenv.config()

const app=express();

app.use(json());

app.use(cors())

app.use('/users',userRouter)
app.use('/tours',tourRouter)
app.use('/reviews',reviewRouter)


app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
    res.json({
        message:error
    })

})

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`This App is running on port:${port}`);
    
})