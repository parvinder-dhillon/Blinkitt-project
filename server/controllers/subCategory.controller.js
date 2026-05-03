import { Subcategory } from '../models/sub_category.model.js'
import { apiError } from '../utils/apiError.js'
import { apiResponse } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
export const addSubCategoryController = asyncHandler(async(req,res)=>{
    const {name, image, category} = req.body
    console.log("this your category data",category )
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
    console.log("this is your payload data ",payload);
    
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
export const editSubCategoryController = asyncHandler(async(req,res)=>{
    const{_id,name,image,category}= req.body
    const checkSub =await Subcategory.findById(_id)
    console.log("checkSubsfnkjbkjfbrwi",checkSub)
    if(!checkSub){
        return res.json(
            new apiError(400,{},"check your  _id")
        )
    }
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(_id,{
        name,
        image,
        category
    })
    console.log("updatedSubcategory",updatedSubcategory);
    return res.json(
        new apiResponse(200,updatedSubcategory,"subcategory updated successfully")
    )
})

export const deleteSubCategoryController =asyncHandler(async(req,res)=>{
    const{ _id } =req.body
    const deleteSub = await Subcategory.findByIdAndDelete(_id)
    return res.json(
        new apiResponse(200,{},"subcategory deleted successfully")
    )
})