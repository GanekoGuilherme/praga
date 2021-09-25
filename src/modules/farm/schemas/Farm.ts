import { Schema, Document, Model, model } from "mongoose";

interface IFarmInterface {
  _id: string;
  name: string;
  userId: string;
  street: string;
  district: string;
  city: string;
  state: string;
  cep: string;
  nirf: string;
  position: {
    lat: Number;
    long: Number;
    radius: Number
  }
}

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

type FarmDocument = Document & IFarmInterface;

type FarmModel = Model<FarmDocument>;

const Farm = model<FarmDocument, FarmModel>("Farm", farm);

export default Farm;