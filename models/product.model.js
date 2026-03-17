import mongoose,{Schema} from "mongoose";

const productschema = new Schema({
    name:{
        type:String,
    },
    image:{
        type:Array,
        default:[]
    },
    category:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Category'
        }
    ],
    subcategory:[{
        type: mongoose.Schema.ObjectId,
        ref:'Subcategory'
    }],
    unit:{
        type:String,
        default:""
    },
    stock:{
        type:Number,
        default:null
    },
    price:{
        type:Number,
        default:null
    },
    discount:{
        type:Number,
        default:null
    },
    description:{
        type:String,
        default:""
    },
    more_details:{
        type:Object,
        default:{}
    },
    publish:{
        type:Boolean,
        default:true
    }
    

},{timestamps:true})

export const Product = mongoose.model("Product",productschema)