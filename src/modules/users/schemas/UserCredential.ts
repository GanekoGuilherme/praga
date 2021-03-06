import { Schema, Document, Model, model } from "mongoose";
import bcryptjs from 'bcryptjs';
interface IUserCredentialInterface {
    _id: string;
    userId: string;
    email: string;
    password: string;
    passwordToken?: string,
    passwordTokenExpires?: Date,
    passwordTokenActive?: boolean,
}

const userCredential = new Schema(
    {
        _id: {
            type: String,
        },
        userId: {
            type: String,
            required: true,
            unique: true,
            ref: 'User',
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        passwordToken: {
            type: String
        },
        passwordTokenExpires: {
            type: Date
        },
        passwordTokenActive: {
            type: Boolean
        }
    }, {
        timestamps: true,
        autoCreate: true,
        versionKey: false,
    },
);

userCredential.pre('save', async function (next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
    next();  
});

type UserCredentialDocument = Document & IUserCredentialInterface;

type UserCredentialModel = Model<UserCredentialDocument>;

const UserCredential = model<UserCredentialDocument,UserCredentialModel>("UserCredential", userCredential);

export default UserCredential;
