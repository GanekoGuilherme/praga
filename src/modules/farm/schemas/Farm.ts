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
    street : {
        type : String
    },
    district : {
      type: String,
    }, 
    city : {
        type: String,
    },
    state: {
      type : String,
      required : true
    },
    cep : {
      type : String,
      required : true,
    },
    nirf : {
      type : String,
      required : true
    },
    position : {
      lat : {
        type : Number,
        required : true,
      },
      long : {
        type : Number,
        required : true,
      },
      radius : {
        type : Number,
        required : true
      }}
},{
    timestamps: true,
    autoCreate: true,
    versionKey: false,
},);

const Farm = mongoose.model("Farm", farm);

export default Farm;