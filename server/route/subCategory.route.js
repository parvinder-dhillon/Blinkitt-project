import {Router} from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
import { addSubCategoryController, deleteSubCategoryController, editSubCategoryController, getSubCategoryDataController } from '../controllers/subCategory.controller.js'
const subCategoryRouter = Router()

subCategoryRouter.post('/create',verifyJWT,addSubCategoryController)
subCategoryRouter.post('/get',getSubCategoryDataController)
subCategoryRouter.put('/update',verifyJWT,editSubCategoryController)
subCategoryRouter.delete('/delete',verifyJWT,deleteSubCategoryController)
export default subCategoryRouter