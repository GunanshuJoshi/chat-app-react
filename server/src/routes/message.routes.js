import express from "express";
import { getChats, getUser, sendMessage } from "../controllers/index.js";
const router = express.Router();
router.get("/users", getUser);
router.get("/:id", getChats);
router.post("/send/:id", sendMessage);

export default router;
