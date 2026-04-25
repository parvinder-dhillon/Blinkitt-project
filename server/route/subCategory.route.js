import {Router} from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
import { addSubCategoryController, getSubCategoryDataController } from '../controllers/subCategory.controller.js'


const subCategoryRouter = Router()

subCategoryRouter.post('/create',verifyJWT,addSubCategoryController)
subCategoryRouter.post('/get',getSubCategoryDataController)

export default subCategoryRouter