import { Schema, model, Types } from "mongoose";

const likeSchema = new Schema(
    {

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
            enum: ["post", "comment","reply"]
        },

    },
    {
        timestamps: true
    }
)




const likeModel = model("like", likeSchema)
export default likeModel