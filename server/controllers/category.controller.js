import {Category} from '../models/category.model.js'
import { Product } from '../models/product.model.js'
import { Subcategory } from '../models/sub_category.model.js'
import { apiError } from '../utils/apiError.js'
import { apiResponse } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
export const addCategoryController = asyncHandler(async(req,res)=>{
    const {name,image} = req.body
    if(!name || !image){
        return res.json(
             new apiError(400,{},"Enter required fields")
        )
       
    }
    const addCategory = new Category({
        name,
        image
    })
    const saveCategory = await addCategory.save() 
    if(!saveCategory){
        return res.status(500).json(
            new apiError(500,{},"Not Created")
        )
    }
    return res.json(
        new apiResponse(200,{saveCategory},"Add categpry")
    )

})
export const getCategoryController =async(req,res)=>{
    try {
        const data = await Category.find().sort({ createdAt:-1 })
        return res.json(
            new apiResponse(200,{data:data},"data fetched")
        )
        
    } catch (error) {
        return res.status(500).json(
            new apiError(500,error,"somthing went wrong")
        )
    }
}
export const updateCategoryController =asyncHandler(async(req,res)=>{

    const { _id,name,image } = req.body
    const update = await Category.updateOne({
        _id : _id
    },{
        name,
        image
    })
    return res.json(
        new apiResponse(200,{data:update},"Updated Category")
    )
})

export const deleteCategoryController = asyncHandler(async(req,res)=>{

    console.log("this is your id :", req.body);
    const{ _id } = req.body
    
    const checkSubCategory = await Subcategory.find({
        category :{
            "$in" : [ _id ]
        }
    }).countDocuments()
    const checkProduct = await Product.find({
        category :{
            "$in" : [ _id ]
        }
    }).countDocuments()

    if(checkSubCategory > 0 || checkProduct  > 0 ){
        return res.status(400).json(
            new apiError(400,{},"Already in use can't delete")
        )
    }
    const deleteCategory =await Category.deleteOne({_id : _id})
    return res.json(
        new apiResponse(200,{deleteCategory},"Category Deleted")
    )
})