import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createProductController, getProductController } from "../controllers/product.controller.js";

const productRouter = Router()

productRouter.post("/create",verifyJWT,createProductController)
productRouter.post("/get",verifyJWT,getProductController)

export default productRouter