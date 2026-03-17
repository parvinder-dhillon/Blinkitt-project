import mongoose,{Schema} from "mongoose";

const cartproductschema = new Schema({
    id:{
        type : mongoose.Schema.ObjectId,
        ref : 'product'
    },
    quantity: {
         type : Number,
         default : 1
    },
    userId:{
        type :mongoose.Schema.ObjectId,
        ref : 'User'
    }


},{timestamps:true})

export const CartProduct = mongoose.model("CartProduct",cartproductschema);