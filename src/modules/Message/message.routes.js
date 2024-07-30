import { Router } from "express";
import * as messageController from "./message.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { errorHandle } from "../../middlewares/error-handle.middleware.js";

const router = Router();

router.post("/addMessage", auth(), errorHandle(messageController.addMessage));
router.get("/readMessage", auth(), errorHandle(messageController.readMessage));
router.delete("/deleteMessage/:messageId", auth(), errorHandle(messageController.deleteMessage));


export default router;