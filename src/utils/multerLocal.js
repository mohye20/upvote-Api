import multer from "multer"
import { nanoid } from "nanoid"
import path from "path"
import fs from "fs"
import { AppError } from "./AppError.js"



export const multerLocal = (customValidation, customPath) => {
    //destination 
    //fileName
    if (!customValidation) {
        customValidation = ["image/jpeg"]
    }
    if (!customPath) {
        customPath = "General"
    }
    const destPash = path.resolve(`uploads/${customPath}`)
    if (!fs.existsSync(destPash)) {
        fs.mkdirSync(destPash, { recursive: true })
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destPash)
        },
        filename: function (req, file, cb) {
            const uniqueName = nanoid(4) + file.originalname
            cb(null, uniqueName)
        }
    })
    const fileFilter = function (req, file, cb) {

        if (customValidation.includes(file.mimetype)) {

            return cb(null, true)
        }
        cb(new AppError(`invalid file ${file.mimetype}`), false)

    }

    const uploadFile = multer({ fileFilter, storage })
    return uploadFile
}