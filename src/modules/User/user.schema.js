import Joi from "joi"

export const userRegistrationSchema = {
    body: Joi.object({
        name: Joi.string().alphanum().min(3).max(15).lowercase().trim().required(),
        email: Joi.string().email({minDomainSegments: 2, maxDomainSegments: 3}).trim().required(),
        password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
        cPass: Joi.string().valid(Joi.ref("password")).required(),
    }),
}