import { Schema } from "mongoose";
import bcryptjs from 'bcryptjs';
import mongoose from "@shared/database";

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

const UserCredential = mongoose.model("UserCredential", userCredential);

export default UserCredential;