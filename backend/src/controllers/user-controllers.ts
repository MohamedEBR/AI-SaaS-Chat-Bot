import { NextFunction, Request, Response } from "express"
import User from "../models/User.js"
import {hash} from 'bcrypt'

export  const getAllUsers = async (
    req : Request, 
    res: Response,
    next: NextFunction) => {
    try {
    //get all users
        const users = await User.find()
        return res.status(200).json({message: "OK", users})
    } catch (err) {
        console.log(err)
        return res.status(200).json({message: "ERROR", cause: err.message})
    }
}

export  const userSignup = async (
    req : Request, 
    res: Response,
    next: NextFunction) => {
    try {
    //user signup
        const {name, email, password} = req.body;
        const hashedPassword = await hash(password, 10)
        const user = new User({
            name,
            email,
            password : hashedPassword
        })
        await user.save()
        return res.status(200).json({message: "OK", id:user._id.toString()})
    } catch (err) {
        console.log(err)
        return res.status(200).json({message: "ERROR", cause: err.message})
    }
}

