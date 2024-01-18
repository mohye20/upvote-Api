

import likeModel from "../../../DB/model/like.model.js";
import postModel from "../../../DB/model/post.model.js";
import { AppError, asyncHandler } from "../../utils/AppError.js";
import commentModel from './../../../DB/model/comment.model.js';
import replyModel from './../../../DB/model/reply.model.js';




// ********************************like***********************************************//
export const likeDoc = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { doc } = req.body

    let model = ''
    if (doc == "post") {
        model = postModel
    }
    else if (doc == "comment") {
        model = commentModel
    }
    else if (doc == "reply") {
        model = replyModel
    }
    else {
        return next(new AppError("invalid model", 400))

    }
    //check document exist 
    const document = await model.findById(id)
    if (!document) {
        return next(new AppError("invalid id", 404))
    }

    //check like done  
    const like = await likeModel.findOne({ id, userId: req.user._id })
    if (like) {
        await likeModel.findOneAndDelete({ _id: like._id, userId: req.user._id })
        document.counter -= 1
        await document.save()
        return res.json({ msg: "unLike", like })
    }
    const newLike = await likeModel.create({ id, doc, userId: req.user._id })
    document.counter += 1
    await document.save()
    return res.json({ msg: "like", newLike })
})