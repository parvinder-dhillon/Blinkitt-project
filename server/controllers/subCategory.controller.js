import { Subcategory } from '../models/sub_category.model.js'
import { apiError } from '../utils/apiError.js'
import { apiResponse } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
export const addSubCategoryController = asyncHandler(async(req,res)=>{
    const {name, image, category} = req.body

    if(!name && !image && !category[0]){
        return res.status(400).json(
            new apiError(400,{},"provide name image and category")
        )
    }
    const payload ={
        name,
        image,
        category
    }
    const createSubCategory = new  Subcategory(payload)
    const save = await createSubCategory.save()
    return res.json(
        new apiResponse(200,save,"Sub Category Created")
    )
})

export const getSubCategoryDataController = asyncHandler(async(req,res)=>{
    const data =await Subcategory.find().sort({createdAt : -1}).populate('category')
    return res.json(
        new apiResponse(200,data,"sub category data")
    )
})
