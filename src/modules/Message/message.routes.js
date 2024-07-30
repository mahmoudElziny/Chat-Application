import { Router } from "express";
import * as messageController from "./message.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { errorHandle } from "../../middlewares/error-handle.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { addMessageSchema, deleteMessageSchema } from "./message.schema.js";

const router = Router();

router.post("/addMessage/:receiverId", auth(), validationMiddleware(addMessageSchema), errorHandle(messageController.addMessage));
router.get("/readMessage", auth(), errorHandle(messageController.readMessage));
router.delete("/deleteMessage/:messageId", auth(), validationMiddleware(deleteMessageSchema), errorHandle(messageController.deleteMessage));


export default router;