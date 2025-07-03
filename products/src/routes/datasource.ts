
import { DataSource,Like  } from "typeorm"
import {User} from "../entities/User"



const AppDataSource = new DataSource ({
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"",
    database:"crudtable",
    synchronize:false,
    entities:[User]


})

AppDataSource.initialize().then(async()=>{
    console.log("Db connected")
}).catch((e)=>{
    console.log(e);
})

export default AppDataSource;
