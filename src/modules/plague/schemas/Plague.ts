import mongoose from "@shared/database";
import { Schema } from "mongoose";

const plague = new Schema({
    _id : {
        type: String,
    },
    name : {
        type : String,
        required : true,
        unique : true
    },
    photo : {
        type : String,
    }, 
    active : {
        type : Boolean,
        required : true,
        default : true
    },
    farmId : {
        type: String,
        required: true,
        unique: true,
        ref: 'Farm',
    }
},{
    timestamps: true,
    autoCreate: true,
    versionKey: false,
},);

const Plague = mongoose.model("Plague", plague);

export default Plague;