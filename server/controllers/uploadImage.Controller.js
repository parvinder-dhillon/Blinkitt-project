import { apiError } from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
export const uploadImageController = async(req,res)=>{
    try {
        const file = req.file
        console.log('file::',file);
        
        const uploadImage = await uploadOnCloudinary(file)
        return res.json(
            new apiResponse(200,uploadImage,"Uploaded")
        )
    } catch (error) {
        return res.status(500).json(
            new apiError(500,{},error.message||error)
        ) 
    }
}