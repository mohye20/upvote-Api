import mongoose from "mongoose"


export const dbConnection = async () => {
    await mongoose.connect(process.env.DB).then(() => {
        console.log("db connect success");
    }).catch((err) => {
        console.log("db connect fail");
    })
}
