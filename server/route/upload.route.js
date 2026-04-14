import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {uploadImageController} from "../controllers/uploadImage.Controller.js";
import upload from "../middleware/multer.middleware.js";
const uploadRouter = Router()

uploadRouter.post("/upload",verifyJWT,upload.single("image"),uploadImageController)

export default uploadRouter