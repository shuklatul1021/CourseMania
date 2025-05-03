import express, { json } from "express"
import userrouter from "./routes/user";
import adminrouter from "./routes/admin";
import courserouter from "./routes/courses";
import { client } from "./config/postgress";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use("/api/v1/users", userrouter);
app.use("/api/v1/admin", adminrouter);
app.use("/api/v1/course", courserouter);


const Connect = ()=>{
    client.connect()
    .then(()=> console.log("Database Connected"))
    .then(()=>{
        app.listen(8000 , ()=>{
            console.log("The Backend Is : http://localhost:" + 8000)
        })
    }) 
}
Connect();
