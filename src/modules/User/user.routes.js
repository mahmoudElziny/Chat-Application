import { Router } from "express";
import { errorHandle } from "../../middlewares/error-handle.middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";

import * as userController from "./user.controller.js";

const router = Router();


router.post("/registration", errorHandle(userController.registration));
router.patch("/verifyEmail", errorHandle(userController.verifyEmail));
router.patch("/login", errorHandle(userController.login));



export default router;