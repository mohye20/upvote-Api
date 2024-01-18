import joi from "joi";
import { generalFiled } from "../../middleware/validation.js";



export const signUp = {
    body: joi.object().required().keys({
        name: joi.string().min(2).max(15).alphanum().required(),
        email: generalFiled.email,
        password: generalFiled.password,
        rePassword: joi.string().valid(joi.ref("password")),
        gender: joi.string().valid("male", "female"),
        // age: joi.number().min(2).max(80).integer().positive().multiple(2),
        // id:generalFiled.id.required()
    }),
    file: generalFiled.file.required()
    // files: joi.object().keys({
    //     image: joi.array().items(generalFiled.file.required()).required(),
    //     images: joi.array().items(generalFiled.file.required().required())
    // }).required()

}

// tld :top level domain

export const signIn = {
    body: joi.object().required().keys({
        email: generalFiled.email,
        password: generalFiled.password,
    })
}


export const updateUser = {
    body: joi.object().required().keys({
        name: joi.string().min(2).max(15),
        gender: joi.string().valid("male", "female")
    })
}
