import path from "path"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve("config/.env") })
import { dbConnection } from "../DB/dbConnection.js"
import userRoutes from "./modules/user/user.routes.js"
import postRoutes from "./modules/post/post.routes.js"
import commentRoutes from "./modules/comment/comment.routes.js"
import likeRoutes from "./modules/like/like.routes.js"
import { AppError, globalErrorHandling } from "./utils/AppError.js"
import { cronOne ,cronTwo,cronThree} from "./utils/cronJob.js"

const port = process.env.PORT || 3001

export const initApp = (app, express) => {

    app.use(express.json())

    app.use("/users", userRoutes)
    app.use("/posts", postRoutes)
    app.use("/comments", commentRoutes)
    app.use("/likes", likeRoutes)
    app.use("/uploads", express.static("uploads"))


    app.all("*", (req, res, next) => {
        let err = new AppError(`invalid url on ${req.originalUrl}`, 404)
        next(err)
    })
    cronOne()
    cronTwo()
    cronThree()
    //global error handling
    app.use(globalErrorHandling)
    //db connect
    dbConnection()

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}