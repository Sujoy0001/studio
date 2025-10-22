import { Router } from "express";
import {
    createPost,
    getAllPosts,
    editPost,
    deletePost
} from "../controllers/post.controller.js";
import { verifyLogin } from "../middlewares/oauth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/createPost").post(verifyLogin, upload.single("image"), createPost);
router.route("/getPosts").get(getAllPosts);
router.route("/editPost/:postId").put(verifyLogin, editPost);
router.route("/deletePost/:postId").delete(verifyLogin, deletePost);

export default router;