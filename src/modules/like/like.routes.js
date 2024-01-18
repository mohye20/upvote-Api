import { Router } from "express";
import * as LC from "./like.controller.js";
import { auth, validRoles } from "../../middleware/auth.js";


const router = Router()

router.post("/:id", auth(validRoles.User), LC.likeDoc)





export default router