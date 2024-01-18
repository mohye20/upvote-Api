import { Router } from "express";
import * as PC from "./post.controller.js";
import { auth, validRoles } from "../../middleware/auth.js";
import * as PV from "./post.validate.js";
import { multerLocal } from "../../utils/multerLocal.js";
import { multerCloudinary } from "../../utils/multerCloudinary.js";
import { validation, headers } from "../../middleware/validation.js";
const router = Router()

router.post("/create",
    validation(headers),
    multerCloudinary().single("image"),
    auth([...validRoles.User, ...validRoles.Admin]),
    validation(PV.createPost),
    PC.createPost)

router.put("/update/:id",
    auth(),
    multerCloudinary().single("image"),
    PC.updatePost)

router.delete("/delete/:id",
    auth(),
    PC.deletePost)
router.patch("/like/:likeId",
    auth(),
    PC.likePost)
router.get("/",
    // auth(),
    PC.getPosts)



export default router