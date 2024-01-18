
import joi from "joi";


export const createPost = {
    body: joi.object().required().keys({
        title: joi.string().min(2).required(),
        content: joi.string().min(2).required()
    }),


}
