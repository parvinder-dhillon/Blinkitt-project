import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token =req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            throw new apiError(401,"provide token")
        }
        // console.log('token',token)
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        // console.log(decodeToken)
        const user= await User.findById(decodeToken?.id).select("-password -refresh_token")
        // console.log(user);
     
        if(!user){
            throw new apiError(401,"invalid access token")
        }
        req.userId=user._id;
        next()
    } catch (error) {
        throw new apiError(401,error?.message||"invalid access token")
        
    }
})