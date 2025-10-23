import { Router } from "express";
import {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    editTeamMember,
    deleteTeamMember,
    totalTeamMembers
} from "../controllers/team.controller.js";
import { verifyLogin } from "../middlewares/oauth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/createMember").post(verifyLogin, upload.single("img"), createTeamMember);
router.route("/getMembers").get(getAllTeamMembers);
router.route("/getMember/:id").get(getTeamMemberById);
router.route("/editMember/:id").put(verifyLogin, upload.single("img"), editTeamMember);
router.route("/deleteMember/:id").delete(verifyLogin, deleteTeamMember);
router.route("/totalTeamMembers").get(totalTeamMembers);

export default router;