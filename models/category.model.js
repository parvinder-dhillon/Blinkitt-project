import mongoose,{Schema} from "mongoose";

const categoryschema = new Schema({
    name:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
},{timestamps:true})

export const Category = mongoose.model("Category",categoryschema);