import mongoose,{Schema} from "mongoose";

const subcatagoryschema = new Schema({
    name:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    category:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'category'
        }
    ]

},{timestamps:true})

export const Subcategory = mongoose.model("Subcategory",subcatagoryschema)