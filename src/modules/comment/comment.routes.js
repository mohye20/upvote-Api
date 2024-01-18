import { Router } from "express";
import * as CC from "./comment.controller.js";
import { auth, validRoles } from "../../middleware/auth.js";
import * as CV from "./comment.validate.js";
import { validation, headers } from './../../middleware/validation.js';


const router = Router()

router.post("/create",
    auth(),
    CC.createComment)

router.put("/update/:id",
    auth(),
    CC.updateComment)

router.delete("/delete/:id",
    auth(),
    CC.deleteComment)
// router.patch("/likeOrUnlike/:commentId",
//     auth(),
//     CC.likeComment)

// router.patch("/likeOrUnlike/:id",
//     auth(),
//     CC.likeComment)


router.patch("/like/:likeId",
    validation(headers),
    auth(validRoles.User),
    validation(CV.likeComment),
    CC.likeComment)

// ***********************************reply routing***************************
router.post("/createReply",
    auth(),
    CC.createReply)

router.patch("/update/:id",
    auth(),
    CC.updateReply)


router.post("/replyOnReply/:id",
    auth(),
    CC.createReplyOnReply)


export default router