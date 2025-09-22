import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    autore: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
}, { timestamps: true })