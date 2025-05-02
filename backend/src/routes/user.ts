import { Router } from "express";
import bcrypt from "bcrypt";
import { client } from "../config/postgress";
import jwt from "jsonwebtoken";
const userrouter = Router();
import { USER_JWT_TOKEN } from "../config/confi";

userrouter.post("/signup", async(req, res)=>{
    const { email, password, username, firstname, lastname } = req.body;
    const Insertquary = "INSERT INTO users (email , password, username, firstname, lastname) VALUES ($1, $2, $3, $4, $5)";
    try{
        const HashPassword = await bcrypt.hash(password, 5);
        const CreateUser = await client.query(Insertquary, [email, HashPassword, username, firstname, lastname]);
        if(CreateUser){
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
userrouter.post("/login", async(req, res)=>{
    const { email, password } = req.body;
    const SearchQuary = "SELECT * FROM users WHERE email = ($1)";
    try{
        const VerifyUser = await client.query(SearchQuary, [email]);
        const users = VerifyUser.rows[0];
        if(VerifyUser){
            const VerifyPassword = await bcrypt.compare(password , users.password);
            if(VerifyPassword){
                const token = await jwt.sign({
                    id : users.id
                },USER_JWT_TOKEN);

                if(token){
                    res.json({
                        token : token
                    })
                }else{
                    res.json({ message : "Error While Signing The Token" })
                }
            }else{
                res.status(401).send({ message : "Incorrect Password" })
            }
        }else{
            res.json({ message : "The Email Id Is Not Registered" })
        }
    }catch(e){
        console.log(e);
        res.json({ message : "Internal Server Error" })
    }
})
userrouter.post("/logout", async(req, res)=>{

})

export default userrouter
