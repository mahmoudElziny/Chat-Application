import { Router } from "express";

import * as messageController from "./message.controller.js";

const router = Router();

router.post("/addMessage", messageController.addMessage);
router.get("/readMessage", messageController.readMessage);
router.delete("/deleteMessage", messageController.deleteMessage);


export default router;