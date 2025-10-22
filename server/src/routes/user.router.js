import { Router } from "express";
import { loginUser, currentUser, logoutUser } from "../controllers/user.controller.js"
import { verifyLogin } from "../middlewares/oauth.middleware.js"

const router = Router();

router.route("/login").post(loginUser);
router.route("/me").get(verifyLogin, currentUser);
router.route("/logout").post(verifyLogin, logoutUser);

export default router;