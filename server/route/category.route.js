import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router()

categoryRouter.post("/add-category",verifyJWT,addCategoryController)
categoryRouter.get("/get",verifyJWT,getCategoryController)
categoryRouter.put("/update",verifyJWT,updateCategoryController)
categoryRouter.delete("/delete",verifyJWT,deleteCategoryController)
export default categoryRouter