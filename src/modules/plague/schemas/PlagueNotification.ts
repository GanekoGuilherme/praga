import { Schema, Document, Model, model } from "mongoose";

interface IPlagueNotificationInterface {
    _id: string;
    message: string;
    userId: string;
  }

const plagueNotification = new Schema({
    _id : {
        type: String,
    },
    message : {
        type : String,
        required : true
    },
    userId : {
        type : String,
    }, 
},{
    timestamps: true,
    autoCreate: true,
    versionKey: false,
},);

type PlagueNotificationDocument = Document & IPlagueNotificationInterface;

type PlagueNotificationModel = Model<PlagueNotificationDocument>;

const PlagueNotification = model<PlagueNotificationDocument, PlagueNotificationModel>("PlagueNotification", plagueNotification);

export default PlagueNotification;