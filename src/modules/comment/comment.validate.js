
import joi from "joi";
import { generalFiled } from "../../middleware/validation.js";


export const likeComment = {
    params: joi.object().required().keys({
        likeId: generalFiled.id.required()
    }),


}
