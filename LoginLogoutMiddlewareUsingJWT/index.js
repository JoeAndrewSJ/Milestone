const express=require('express')
const port=3000
const app=express()
const router=require('./Routes/UserRoutes')
const sequelize=require('./config/database')



app.use(express.json())


app.use('/api',router);

sequelize.sync().then(() => {
  console.log('DB synced');
});

app.listen(port,()=>{
    console.log("Hello bro i have started");
})


