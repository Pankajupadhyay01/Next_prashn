import mongoose, { Document, Schema } from "mongoose";

export interface question extends Document {
    title: string,
    body: string,
    category?: string,
    userId: Schema.Types.ObjectId,
    answers: Schema.Types.ObjectId[],
    createdAt: Date,
    updatedAt?: Date,
}

const questionSchema: Schema<question> = new Schema({
    title: {
        type: String,
        required: [true, "Please enter title of your question"],
    },
    body: {
        type: String,
        required: [true, "Please Describe your question"],
    },
    category: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: "Answer"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
})


const questionModel = (mongoose.models.Question as mongoose.Model<question>) || mongoose.model<question>("Question", questionSchema)
export default questionModel;