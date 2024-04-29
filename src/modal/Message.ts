import mongoose, { Schema, Document } from "mongoose";
import { user } from "./User";

export interface message extends Document {
    user: Schema.Types.ObjectId,
    content: string,
    createdAt: Date
}

const messageSchema: Schema<message> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const messageModel = (mongoose.models.Message as mongoose.Model<message>) || mongoose.model<message>("Message", messageSchema)
export default messageModel;