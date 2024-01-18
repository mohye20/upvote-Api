import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            max: 15
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            default: "male"
        },
        isConfirmed: {
            type: Boolean,
            default: false
        },
        loggedIn: {
            type: Boolean,
            default: false
        },
        image: Object,
        images: [Object],
        role: {
            type: String,
            enum: ["User", "Admin"],
            default: "User"
        },
        deadline: Date

    },
    {
        timestamps: true
    }
)

const userModel = model("user", userSchema)
export default userModel