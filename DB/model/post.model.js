import { Schema, model, Types } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: String,
        userId: {
            type: Types.ObjectId,
            ref: "user",
        },

        image: Object,
       
        counter: {
            type: Number,
            default: 0
        },
        comments: [{
            type: Types.ObjectId,
            ref: "comment"
        }]

    },
    {
        timestamps: true
    }
)

const postModel = model("post", postSchema)
export default postModel