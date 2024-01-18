
import axios from 'axios';
import commentModel from '../../../DB/model/comment.model.js';
import likeModel from '../../../DB/model/like.model.js';
import replyModel from '../../../DB/model/reply.model.js';
import postModel from './../../../DB/model/post.model.js';
import { AppError, asyncHandler } from './../../utils/AppError.js';


// ********************************createComment***********************************************//
export const createComment = asyncHandler(async (req, res, next) => {
    const { content, postId } = req.body
    const post = await postModel.findById(postId)
    if (!post) {
        return next(new AppError("post not exist", 404))
    }
    const comment = await commentModel.create({ content, userId: req.user._id })
    await postModel.updateOne({ _id: postId }, { $push: { comments: comment._id } })
    comment ? res.json({ msg: "done", comment }) : next(new AppError("fail", 500))


})


// ********************************updateComment***********************************************//
export const updateComment = asyncHandler(async (req, res, next) => {
    const { content } = req.body
    const comment = await commentModel.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        { content },
        { new: true }
    )
    comment ? res.json({ msg: "done", comment }) : next(new AppError("comment not exist or  not owner", 400))


})


// ********************************deleteComment***********************************************//
export const deleteComment = asyncHandler(async (req, res, next) => {
    console.log("sss");
    const { postId } = req.body
    const comment = await commentModel.findOneAndDelete(
        { _id: req.params.id, userId: req.user._id },
        { new: false }
    )
    if (!comment) {
        return next(new AppError("comment not exist", 404))

    }
    await postModel.updateOne({ _id: postId }, { $pull: { comments: comment._id } })
    comment ? res.json({ msg: "done", comment }) : next(new AppError("comment not exist or  not owner", 400))


})



// ********************************createReply***********************************************//
export const createReply = asyncHandler(async (req, res, next) => {
    const { content, commentId } = req.body
    const comment = await commentModel.findById({ _id: commentId })
    if (!comment) {
        return next(new AppError("comment not exist", 404))
    }
    const reply = await replyModel.create({
        content,
        userId: req.user._id,
        id: commentId,
        doc: "comment"
    })

    reply ? res.json({ msg: "done", reply }) : next(new AppError("fail", 500))


})

// ********************************updateReply***********************************************//
export const updateReply = asyncHandler(async (req, res, next) => {
    const { content } = req.body
    const reply = await replyModel.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        { content },
        { new: true }
    )
    reply ? res.json({ msg: "done", reply }) : next(new AppError("reply not exist or  not owner", 400))


})




// ********************************createReplyOnReply***********************************************//
export const createReplyOnReply = asyncHandler(async (req, res, next) => {
    const { content } = req.body
    const exist = await replyModel.findById(req.params.id)
    if (!exist) {
        return next(new AppError("reply not exist", 404))
    }
    const reply = await replyModel.create({ content, doc: "reply", userId: req.user._id })
    // await replyModel.updateOne({ _id: req.params.id }, { $push: { replies: reply._id } })
    reply ? res.json({ msg: "done", reply }) : next(new AppError("fail", 500))


})


// // ********************************like***********************************************//
// export const likeComment = asyncHandler(async (req, res, next) => {
//     const { commentId } = req.params
//     const comment = await commentModel.findById(commentId)
//     if (!comment) {
//         return next(new AppError("comment not exist", 404))
//     }
//     const like = await likeModel.findOne({ id: commentId })
//     if (like) {
//         await likeModel.findOneAndDelete({ _id: like._id, userId: req.user._id })
//         comment.counter -= 1
//         await comment.save()
//         return res.json({ msg: "unLike", like })
//     }
//     const newLike = await likeModel.create({ id: commentId, doc: "comment", userId: req.user._id })
//     comment.counter += 1
//     await comment.save()
//     return res.json({ msg: "like", newLike })
// })


// ********************************like***********************************************//
export const likeComment = asyncHandler(async (req, res, next) => {
    const { likeId } = req.params

    await axios({
        method: 'post',
        url: `http://localhost:3000/likes/${likeId}`,
        data: {
            doc: "comments"
        },
        headers: {
            token: req.headers.token
        }

    }).then((response) => {
        // console.log(response);
        res.status(200).json({ msg: response.data.msg })
    }).catch((err) => {
        console.log(err.response);
        // res.status(400).json({ msg:err.response.data })

        return next(new AppError(err.response.data.err, 400))
    })



})

