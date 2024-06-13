import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface user extends Document {
    username: string,
    password: string,
    email: string,
    verifyCode: string,
    isVerified: boolean,
    verifyExpire: Date,
    message: Schema.Types.ObjectId,
    resetToken?: string,
    resetTokenExpire?: Date
}

const userSchema: Schema<user> = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    email: {
        type: String,
        required: [true, "Please enter your mail id "],
        unique: true
    },
    verifyCode: {
        type: String,
        required: [true, "Please verify your Code "]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyExpire: {
        type: Date,
        default: Date.now
    },
    message: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    resetToken: {
        type: String
    },
    resetTokenExpire: {
        type: Date,
        default: Date.now
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    } else {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

const userModel = (mongoose.models.User as mongoose.Model<user>) || mongoose.model<user>("User", userSchema)
export default userModel;