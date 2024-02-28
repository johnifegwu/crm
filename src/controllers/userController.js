import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from "../models/userModel";

const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) =>{
    if(req.user != undefined){
        next();
    }
    else{
        return res.status(401).json({message:'Unauthorized user.'});
    }
}

export const registerUser = async (req, res) => {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    try{
        let resp = await newUser.save();
        newUser.hashPassword = undefined;
        return res.json(newUser);
    }
    catch(err){
        res.status(400).json(err);
    }
}

export const login = async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(401).json({message: 'Authentication failed. No user found.'});
        }else if(user){
            //Compare password
            if(!user.comparePassword(req.body.password, user.hashPassword)){
                res.status(401).json({message: 'Authentication failed. Invalid password.'});
            }else{
                return res.json({access_token: jwt.sign({email: user.email, username: user.userName, _id: user._id}, 'mysecretekey')});
            }
        }
    }
    catch(err){
        throw err;
    }
}