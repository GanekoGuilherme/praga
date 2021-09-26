import { Schema, Document, Model, model } from "mongoose";

interface IPlagueImagesInterface {
    _id: string;
    path: string;
    plagueId: string;
  }

const plagueImages = new Schema({
    _id: {
        type: String,
    },
    path: {
        type : String,
        required : true
    },
    plagueId : {
        type : String,
        required : true
    },
},{
    timestamps: true,
    autoCreate: true,
    versionKey: false,
},);

type PlagueImagesDocument = Document & IPlagueImagesInterface;

type PlagueImagesModel = Model<PlagueImagesDocument>;

const PlagueImages = model<PlagueImagesDocument, PlagueImagesModel>("PlagueImages", plagueImages);

export default PlagueImages;