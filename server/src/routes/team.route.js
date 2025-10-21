import { Router } from "express";
import {
    createTeamMember,
    getAllTeamMembers,
    editTeamMember,
    deleteTeamMember
} from "../controllers/team.controller.js";
import { verifyLogin } from "../middlewares/oauth.middleware.js";

const router = Router();

router.route("/createMember").post(verifyLogin, createTeamMember);
router.route("/getMembers").get(verifyLogin, getAllTeamMembers);
router.route("/editMember/:id").put(verifyLogin, editTeamMember);
router.route("/deleteMember/:id").delete(verifyLogin, deleteTeamMember);

export default router;