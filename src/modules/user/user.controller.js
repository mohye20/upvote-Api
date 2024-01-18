import userModel from "../../../DB/model/user.model.js"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { AppError, asyncHandler } from "../../utils/AppError.js";
import fs from 'fs';
import path from "path";
import cloudinary from "../../utils/cloudinary.js";
import postModel from "../../../DB/model/post.model.js";
import { generateQrCode } from "../../utils/qrcode.js";




export const signUp = asyncHandler(async (req, res, next) => {
    // console.log("req.file");
    // console.log("==============================================");
    const { name, email, password, gender } = req.body
    const exist = await userModel.findOne({ email })
    if (exist) {
        return next(new AppError("user already exist", 409))
    }
    const hash = bcrypt.hashSync(password, +process.env.SALT_ROUND)
    // let paths = []
    // for (const file of req.files) {
    // const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
    //     folder: "upVote/users"
    // })
    //     paths.push({ secure_url, public_id })
    // }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: "upVote/users"
    })
    const user = await userModel.create({ name, email, password: hash, gender, image: { secure_url, public_id } })
    user ? res.json({ msg: "done", user }) : next(new AppError("fail", 500))

})


export const signIn = async (req, res, next) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email, loggedIn: false })
    if (!user) {
        return next(new AppError("user not exist or already logged in", 404))
    }
    const match = bcrypt.compareSync(password, user.password)
    if (!match) {
        return next(new AppError("password not match", 400))
    }
    const token = jwt.sign({ id: user._id, email: user.email, gender: "male" }, process.env.SIGNATURE)
    await userModel.updateOne({ email }, { loggedIn: true })
    res.json({ msg: "done", token })
}


export const updateUser = asyncHandler(async (req, res, next) => {
    const { name, gender } = req.body
    const user = await userModel.findById(req.user.id)
    if (name) {
        if (user.name == name) {
            return next(new AppError("name match old name plz change its", 409))
        }
        user.name = name
    }
    if (gender) {
        if (user.gender == gender) {
            return next(new AppError("gender match old gender plz change its", 409))
        }
        user.gender = gender
    }
    await user.save()
    res.json({ msg: "done" })
})

export const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.body
    const user = await userModel.findByIdAndDelete(id)

    user ? res.json({ msg: "done" }) : next(new AppError("user not exist", 404))
})



export const getUsers = asyncHandler(async (req, res, next) => {

    const user = await userModel.findOne()
    // let arr = []
    // for (const user of users) {
    //     const post = await postModel.find({ userId: user._id })
    //     const newUser = user.toObject()
    //     newUser.post = post
    //     arr.push(newUser)
    // }
    // ***********************************************
    // const cursor = userModel.find({}).cursor();
    // let arr = []

    // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    //     const post = await postModel.find({ userId: doc._id })
    //     const newUser = doc.toObject()
    //     newUser.post = post
    //     arr.push(newUser)
    // }

    const generateQr = await generateQrCode(user.name)

    res.json({ msg: "done", generateQr, arr })
})