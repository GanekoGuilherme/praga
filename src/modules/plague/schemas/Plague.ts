import { IFarmInterface } from "@modules/farm/schemas/Farm";
import { Schema, Document, Model, model } from "mongoose";

interface IPlagueInterface {
    _id: string;
    name: string;
    photo?: string;
    active: boolean;
    farmId: IFarmInterface;
  }

const plague = new Schema({
    _id : {
        type: String,
    },
    name : {
        type : String,
        required : true
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
        ref: 'Farm',
    }
},{
    timestamps: true,
    autoCreate: true,
    versionKey: false,
},);

type PlagueDocument = Document & IPlagueInterface;

type PlagueModel = Model<PlagueDocument>;

const Plague = model<PlagueDocument, PlagueModel>("Plague", plague);

export default Plague;