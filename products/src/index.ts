import express  from "express"
import route from "./routes/authroutes"
import productRoutes from "./routes/Products"
const app=express()
import { connectMongoDB } from "../src/config/mongoose";
const port=3000

app.use(express.json())



app.use('/api/auth',route);
app.use('/api/products', productRoutes);

connectMongoDB();



app.listen(port,()=>{
    console.log("Server started...")
})


