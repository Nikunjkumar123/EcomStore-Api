// const { ref } = require('joi')
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'pls provide product name'],
        maxlength:[100,'name cant be more than 100 words'],
    },
    price:{
        type:Number,
        required:[true,'pls provide product price'],
        default:0,
    },
    description:{
        type:String,
        required:[true,'pls provide product description'],
        maxlength:[1000,'name cant be more than 1000 words'],
    },
    image:{
        type:String,
        default:'/upload/example.jpeg',
    },
    category:{
        type:String,
        required:[true,'pls provide product category'],
        enum:['office','kitchen','bedroom','electronic'],
    },
    company:{
        type:String,
        required:[true,'pls provide product company'],
        enum:{
            values:['ikea','liddy','marcos','apple'],
            message:'{Value} is not supported'
        },
    },
    colors:{
        type:[String],
        required:true,
    },
    featured:{
        type:Boolean,
        default:false,
    },
    freeShipping:{
        type:Boolean,
        default:false,
    },
    inventory:{
        type:Number,
        required:true,
        default:15,
    },
    averageRating:{
        type:Number,
        default:0,
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
},{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
ProductSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
  });
  
  ProductSchema.pre('remove', async function (next) {
    await this.model('Review').deleteMany({ product: this._id });
  });
module.exports = mongoose.model('Product',ProductSchema);