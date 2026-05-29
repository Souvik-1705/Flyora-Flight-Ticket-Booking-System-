import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const registerUser=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;

        const userExists=await User.findOne({email});

        if(userExists){
            return res.status(400).json({message:"User exists already"});
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role,
        });

        res.status(201).json({
            message:"User created successfully",
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}


export const loginUser=async(req,res)=>{
    try {
        const{email,password}=req.body;
        
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        //compare password
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        res.status(200).json({
            message:"Login Successful",
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

export const getUserProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id);

        if(user){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            })
        }
        else{
            res.status(400).json({message:"User not found"});
        }

    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

export const adminLogin=async(req,res)=>{
    try {
        const{email,password}=req.body;

        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"Invalid email or password"});
        }
        if(user.role!=="admin"){
            return res.status(404).json({message:"Not authorized as admin"});
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        res.status(200).json({
            message:"Admin Login Successful",
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}