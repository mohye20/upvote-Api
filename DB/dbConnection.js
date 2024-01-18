import mongoose from "mongoose"


export const dbConnection = async () => {
    await mongoose.connect("mongodb://localhost:27017/upVote").then(() => {
        console.log("db connect success");
    }).catch((err) => {
        console.log("db connect fail");
    })
}