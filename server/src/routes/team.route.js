import { Router } from "express";
import {
    createTeamMember,
    getAllTeamMembers,
    editTeamMember,
    deleteTeamMember
} from "../controllers/team.controller.js";
import { verifyLogin } from "../middlewares/oauth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/createMember").post(verifyLogin, upload.single("img"), createTeamMember);
router.route("/getMembers").get(verifyLogin, getAllTeamMembers);
router.route("/editMember/:id").put(verifyLogin, upload.single("img"), editTeamMember);
router.route("/deleteMember/:id").delete(verifyLogin, deleteTeamMember);

export default router;