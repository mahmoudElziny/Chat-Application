import Joi from "joi"
import { generalRules } from "../../utils/general-rules.utils.js"

export const addMessageSchema = {
    body: Joi.object({
        content: Joi.string().max(500).trim().required(),
    }),
    params: Joi.object({
        receiverId: generalRules.ObjectId.required(),
    }),
}

export const deleteMessageSchema = {
    params: Joi.object({
        messageId: generalRules.ObjectId.required(),
    }),
}