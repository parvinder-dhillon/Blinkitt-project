import mongoose,{Schema} from "mongoose";

const orderschema = new Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    orderId : {
        type : String,
        required : [true, "provide orderId"],
        unique : true 
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },

    product_details : {
        _Id : String,
        name : String,
        image : Array, 

    },
    paymentId : {
        type : String,
        default : ""
    },
    payment_status : {
        type : String,
        default : ""
    },
    delivery_address :{
        type : mongoose.Schema.ObjectId,
        ref  : 'address'
    },
     subTotalAmt : {
        type : Number,
        default : 0
     },
     totalAmt : {
        type : Number,
        default : 0
     },  
     invoice_receipt : {
        type : String,
        default :""
     }
},{timestamps:true})

export const Order = mongoose.model("Order",orderschema);