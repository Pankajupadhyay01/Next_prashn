import mongoose, { Schema, Document } from "mongoose";

export interface answer extends Document {
    user: Schema.Types.ObjectId,
    questionId: Schema.Types.ObjectId,
    content: string,
    upvote: number,
    downvote: number,
    createdAt: Date
}

const answerSchema: Schema<answer> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
    },
    content: {
        type: String,
        required: true
    },
    upvote: {
        type: Number,
        default: 0
    },
    downvote: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const answerModel = (mongoose.models.Answer as mongoose.Model<answer>) || mongoose.model<answer>("Answer", answerSchema)
export default answerModel;