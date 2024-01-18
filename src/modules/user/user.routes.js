import { Router } from "express";
import * as UC from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as UV from "./user.validate.js";
import { multerLocal } from "../../utils/multerLocal.js";
import { multerCloudinary } from "../../utils/multerCloudinary.js";

const router = Router()

router.post("/signUp",
    multerCloudinary().single("image"),
    validation(UV.signUp),
    UC.signUp)
router.post("/signIn", validation(UV.signIn), UC.signIn)


router.put("/update",
    auth(),
    multerCloudinary().single("image"),
    UC.updateUser)


router.delete("/delete", UC.deleteUser)
router.get("/", UC.getUsers)




export default router