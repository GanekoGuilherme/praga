import mongoose from "@shared/database";
import { Schema } from "mongoose";

const user = new Schema(
    {
        _id: {
            type: String,
        },
        taxId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
        }
    }, {
        timestamps: true,
        autoCreate: true,
        versionKey: false,
    },
);

const User = mongoose.model("User", user);

export default User;