import { Router } from "express";
import { client } from "../config/postgress";
import bcrypt from "bcrypt" 
const adminrouter = Router();
import { AdminAuth } from "../middleware/auth";
import { ADMIN_JWT_TOKEN } from "../config/confi";
import jwt from "jsonwebtoken"

adminrouter.post("/signup", async(req, res)=>{
    const { email, password, username, firstname, lastname } = req.body;
    const Insertquary = "INSERT INTO adminaccount (email , password, username, firstname, lastname) VALUES ($1, $2, $3, $4, $5)";
    try{
        const HashPassword = await bcrypt.hash(password, 5);
        const AdminCreateUser = await client.query(Insertquary, [email, HashPassword, username, firstname, lastname]);
        if(AdminCreateUser){
            res.json({
                message : "User Created Succsessfully"
            })
        }else{
            res.json({
                message : "Error While Signup"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Server Error"
        })
    }   
})
adminrouter.post("/login", async(req, res)=>{
    const { email, password } = req.body;
    const SearchQuary = "SELECT * FROM adminaccount WHERE email = ($1)";
    try{
        const AdminVerifyUser = await client.query(SearchQuary, [email]);
        const admin = AdminVerifyUser.rows[0];
        if(AdminVerifyUser){
            const VerifyPassword = await bcrypt.compare(password , admin.password);
            if(VerifyPassword){
                const token = await jwt.sign({
                    id : admin.id
                },ADMIN_JWT_TOKEN);

                if(token){
                    res.json({
                        token : token
                    })
                }else{
                    res.json({
                        message : "Error While Signing The Token"
                    })
                }
            }else{
                res.status(401).send({
                    message : "Incorrect Password"
                })
            }
        }else{
            res.json({
                message : "Your Are Not Registered As Admin"
            })
        }
    }catch(e){
        console.log(e);
        res.json({
            message : "Internal Server Error"
        })
    }

})

adminrouter.post("/logout", (req, res)=>{

})

adminrouter.post("/addcourses", AdminAuth , async(req, res)=>{
    const adminId = req.adminId;
    const { title , description , price, imageurl } = req.body;
    try{
        const CourseAddingQuary = "INSERT INTO courses (title, description, price, imageurl, userId  ) VALUES ($1, $2, $3, $4, $5)";
        const CourseAdd = await client.query(CourseAddingQuary , [title, description,price, imageurl, adminId]);
        if(CourseAdd){
            res.json({
                message : "Your Course Added"
            })
        }else{
            res.json({
                message : "Error While Adding"
            })
        }
    }catch(e){
        console.log(e);
        res.json({
            message : "Error While Adding"
        })
    }

})
adminrouter.get("/alladmincourses", async(req, res)=>{
    try{
        const Data = await client.query("SELECT * FROM courses");
        const DataRows = Data.rows;
        console.log(DataRows);
        res.json({
            DataRows
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Errror"
        })
    }

})

adminrouter.put("/editcourse/:id", async(req, res)=>{
    const id = req.params.id;
    const { title , description , price, imageurl } = req.body;
    try{
        const CheckCouseId = await client.query("SELECT id FROM courses WHERE id = $1" , [id])
        if(CheckCouseId){
            const UpdateQuary = "UPDATE courses SET title = $1 , description = $2 , price = $3 , imageurl = $4 WHERE id = $5";
            const UpdataeCourse = await client.query(UpdateQuary , [title, description , price , imageurl, id]);
            if(UpdataeCourse){
                res.status(200).send({
                    message : "Course Updated Succsesfully"
                })
            }else{
                res.status(401).send({
                    messgae : "Errror While Updating"
                })
            }

        }else{
            res.json({ message : "The Course Is Not Available" })
        }
    }catch(e){
        console.log(e);
        res.status(500).send({
            message : "Internal Server Error"
        })
    }

})
adminrouter.delete("/deletecourse/:id", async(req, res)=>{
    const id = req.params.id;
    try{
        const GetCourseWithId = await client.query("SELECT id FROM courses WHERE id = $1" , [id]);
        if(GetCourseWithId){
            const DeleteQuary = "DELETE FROM courses WHERE id = $1";
            const DeleteCouseRow = await client.query(DeleteQuary , [id]);
            if(DeleteCouseRow){
                res.status(200).send({
                    message : "Deleted Succsessfully"
                })
            }else{
                res.status(401).send({ message : "Error While Deleting" })
            }

        }else{
            res.status(401).send({
                message : "Course Not Present"
            })
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})


export default adminrouter
