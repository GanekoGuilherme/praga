import mongoose from "@shared/database";
import { Schema } from "mongoose";

const farm = new Schema({
    _id : {
        type: String,
    },
    name : {
        type : String,
        required : true
    },
    userId : {
      type: String,
      required: true,
      unique: true,
      ref: 'User',
    },
    addressId : {
        type: String,
        required: true,
        unique: true,
        ref: 'Address',
    }
},{
    timestamps: true,
    autoCreate: true,
    versionKey: false,
},);

const Farm = mongoose.model("Farm", farm);

export default Farm;