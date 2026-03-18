import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadOnCloudinary = async(image)=>{
    const buffer =image.buffer

    const uploadImage = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({ folder : "blinkett"},(error,uploadResult)=>{
            if(error){
                console.log("cloudinary error:",error)
                return reject(error)
            }
            // console.log("uploaded image",uploadResult)

            resolve(uploadResult)
        }).end(buffer)
        })

       
    return uploadImage

}
export default uploadOnCloudinary