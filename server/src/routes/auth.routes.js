import express from "express";
import {
  signUp,
  logIn,
  logOut,
  updateProfile,
  checkAuth,
} from "../controllers/index.js";
import { authorizationChecker } from "../middleware/index.js";
const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);
router.post("/logout", logOut);

router.put("/profile-update", authorizationChecker, updateProfile);
router.get("/check", authorizationChecker, checkAuth);
export default router;
