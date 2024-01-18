
import likeModel from "../../../DB/model/like.model.js";
import postModel from "../../../DB/model/post.model.js";
import { AppError, asyncHandler } from "../../utils/AppError.js";
import cloudinary from './../../utils/cloudinary.js';
import axios from 'axios';


// ********************************createPost***********************************************//
export const createPost = asyncHandler(async (req, res, next) => {
    console.log(req.file);
    const { title, content } = req.body
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: "upVote/post"
    })
    const post = await postModel.create({
        title, content,
        userId: req.user._id,
        image: { secure_url, public_id }
    })
    post ? res.json({ msg: "done" }) : next(new AppError("fail", 500))

})


// ********************************updatePost***********************************************//
export const updatePost = asyncHandler(async (req, res, next) => {
    const { title, content } = req.body
    const post = await postModel.findOne({ _id: req.params.id, userId: req.user._id })
    if (!post) {
        return next(new AppError("psot not exist", 404))
    }
    if (title) {
        post.title = title
    }
    if (content) {
        post.content = content
    }
    if (req.file) {
        await cloudinary.uploader.destroy(post.image.public_id)
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: "upVote/post"
        })
        post.image = { secure_url, public_id }
    }
    await post.save()
    res.json({ msg: "done" })

})


// ********************************deletePost***********************************************//
export const deletePost = asyncHandler(async (req, res, next) => {

    const post = await postModel.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
    if (!post) {
        return next(new AppError("post not exist or your are not owner", 404))
    }
    await cloudinary.uploader.destroy(post.image.public_id)

    res.json({ msg: "done" })

})


// ********************************like***********************************************//
export const likePost = asyncHandler(async (req, res, next) => {
    const { likeId } = req.params

    await axios({
        method: 'post',
        url: `http://localhost:3000/likes/${likeId}`,
        data: {
            doc: "post"
        },
        headers: {
            token: req.headers.token
        }

    }).then((response) => {
        console.log(response);
        res.status(200).json({msg:response.data.msg})
    }).catch((err) => {
        console.log(err);

    })



})

// ********************************unlike***********************************************

// export const unlikePost = asyncHandler(async (req, res, next) => {

//     const post = await postModel.findOneAndUpdate(
//         { _id: req.params.id, unLike: { $nin: [req.user._id] } },
//         {
//             $addToSet: { unLike: req.user._id },
//             $pull: { like: req.user._id }
//         },
//         { new: true }
//     )
//     console.log(post);
//     if (!post) {
//         return next(new AppError("post not exist", 404))
//     }
//     post.counter = (post?.like.length) - (post?.unLike.length)
//     await post.save()
//     res.json({ msg: "unlike", post })

// })







// ********************************getPosts***********************************************
export const getPosts = asyncHandler(async (req, res, next) => {

    const posts = await postModel.find().populate([
        {
            path: "comments"
        }
    ])

    res.json({ msg: "done", posts })

})



