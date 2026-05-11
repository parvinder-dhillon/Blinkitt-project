import { Product } from '../models/product.model.js'
import { apiError } from '../utils/apiError.js'
import { apiResponse } from '../utils/apiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const createProductController = asyncHandler(async (req, res) => {
    const {
        name,
        image,
        category,
        subcategory,
        unit,
        stock,
        price,
        discount,
        description,
        more_details,
    } = req.body

    if(!name || !image || !category || !subcategory || !unit || !stock || !price || !description){
        return res.json(
            new apiError(400,{},"please provide required data")
        )
    }
    const product = new Product({
        name,
        image,
        category,
        subcategory,
        unit,
        stock,
        price,
        discount,
        description,
        more_details,
    })
    const saveProduct =await product.save()

    return res.json(
        new apiResponse(200,saveProduct,"Product Added Successfully")
    )

})

export const getProductController=asyncHandler(async(req,res)=>{
    let {page,limit,search}=req.body
    console.log("req.body",page)
    if(!page){
        page=1
    }
    if(!limit){
        limit=10
    }
    const query =search?{
        $text:{
            $search:search
        }
    }:{}
    const skip = (page - 1) * limit
    const [data,totalCount]= await Promise.all([
        Product.find(query).sort({createdAt:-1}).skip(skip).limit(limit),
        Product.countDocuments(query)
    ])
    console.log("totalCount",totalCount)
    return res.json(
        new apiResponse(200,{data,totalCount:totalCount,totalNoPage:Math.ceil(totalCount/limit)},"Product data")
    )
})