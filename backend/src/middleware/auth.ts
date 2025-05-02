import {NextFunction, Request, Response} from "express"
import { USER_JWT_TOKEN, ADMIN_JWT_TOKEN } from "../config/confi";
import jwt from "jsonwebtoken"


export const UserAuth = (req:Request, res:Response, next:NextFunction)=>{
    const token = req.headers.token;
    try{
        if (!token) {
            res.status(401).json({
                message: "Token Required"
            });
            return
        }
        const verifiedToken = jwt.verify(token as string, USER_JWT_TOKEN);
        if(verifiedToken && typeof verifiedToken !== 'string'){
            req.userId = verifiedToken.id;
            next();
        }else{
            res.json({
                message : "Token incorrect"
            })
        }
    }catch(e){
        console.log(e);
        res.json({
            message : "Token Invalid"
        })
    }
}
export const AdminAuth = (req:Request, res:Response, next: NextFunction)=>{
    const token = req.headers.token;

    try{
        if (!token) {
            res.status(401).json({
                message: "Token Required"
            });
            return
        }
        const verifiedToken = jwt.verify(token as string, ADMIN_JWT_TOKEN);
        if(verifiedToken && typeof verifiedToken !== 'string'){
            req.adminId = verifiedToken.id;
            next();
        }else{
            res.json({
                message : "Token incorrect"
            })
        }
    }catch(e){
        console.log(e);
        res.json({
            message : "Token Invalid"
        })
    }
}