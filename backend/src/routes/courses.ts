import { Router } from "express";
import { client } from "../config/postgress";
import { UserAuth } from "../middleware/auth";
const courserouter = Router();

courserouter.get("/allcourses",UserAuth ,async(req, res)=>{
    try{
        const AllCourses = await client.query("SELECT * FROM courses");
        const Data = AllCourses.rows;
        console.log(Data)
        if(Data){
            res.status(200).send({
                Data
            })
        }else{
            res.json({
                message : "Error While Getting The Data"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).send({
            mesage : "Internal Server Error"
        })
    }
    
})
courserouter.post("/purchesecourse/:id", UserAuth , async(req, res)=>{
    const userId = req.userId;
    const courseid = req.params.id;
    try{
        const InsertquaryTransection = "INSERT INTO purchese (userid , courseid) VALUES ($1, $2)";
        const InsertData = await client.query(InsertquaryTransection, [userId, courseid]);
        if(InsertData){
            res.status(200).send({
                message : "You Have been Successfully Buy The Courses"
            })
        }else{
            res.status(401).send({
                message : "Error While Buying"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).send({ message : "Internal Server Error" })
    }

})
courserouter.get("/mypurchesecourse", UserAuth ,async(req, res)=>{
    const userId = req.userId;
    try{
        const UserPurchese = await client.query("SELECT p.id, p.userid, p.courseid, p.created_at, c.title, c.description, c.imageurl , c.price FROM purchese p JOIN courses c ON p.courseid = c.id WHERE p.userid = $1" , [userId]);
        const PurcheseData = UserPurchese.rows;
        console.log(PurcheseData);
        if(PurcheseData){
            res.status(200).send({ PurcheseData })
        }else{
            res.status(401).send({ message : "Error While Fetching" })
        }
    }catch(e){
        console.log(e);
        res.json({ message : "Internal Sever Error" })
    }
})

export default courserouter
