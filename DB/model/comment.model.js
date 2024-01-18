import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema(
    {
       
        content: String,
        userId: {
            type: Types.ObjectId,
            ref: "user",
        },
        counter: {
            type: Number,
            default: 0
        }

    },
    {
        timestamps: true
    }
)

const commentModel = model("comment", commentSchema)
export default commentModel