import { Schema, model, Types } from "mongoose";

const replySchema = new Schema(
    {

        content: String,
        userId: {
            type: Types.ObjectId,
            ref: "user",
        },
        id: {
            type: Types.ObjectId,
            refPath: "doc",
        },
        doc: {
            type: String,
            enum: ["comment", "reply"]
        }

    },
    {
        timestamps: true
    }
)

const replyModel = model("reply", replySchema)
export default replyModel