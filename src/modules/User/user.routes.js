import { Router } from "express";
import { errorHandle } from "../../middlewares/error-handle.middleware.js";
import * as userController from "./user.controller.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { userRegistrationSchema } from "./user.schema.js";

const router = Router();


router.post("/registration", validationMiddleware(userRegistrationSchema), errorHandle(userController.registration));
router.patch("/verifyEmail", errorHandle(userController.verifyEmail));
router.patch("/login", errorHandle(userController.login));



export default router;