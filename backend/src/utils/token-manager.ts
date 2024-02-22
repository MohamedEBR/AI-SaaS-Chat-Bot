import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import { log } from "console";


export const createToken = (id:string, email:string, expiresIn: string) => {
    const payload = {id, email};
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn})   
    return token;
}


export const verifyToken = async (req:  Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if(!token || token.trim() === ""){
        return res.status(401).json({message: "Token not provided"})
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token as string, process.env.JWT_SECRET as string, (err, success) => {
            if(err){
                reject(err.message);
                return res.status(401).json({message: "token expired"})
            } else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        })
    })
}