import mongoose from "@shared/database";
import { Schema } from "mongoose";

const address = new Schema({
    _id : {
        type: String,
    },
    street : {
        type : String
    },
    district : {
      type: String,
    }, 
    name : {
        type : String,
        required : true
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
      }
    }
},{
    timestamps: true,
    autoCreate: true,
    versionKey: false,
},);

const Address = mongoose.model("Address", address);

export default Address;