import { Router } from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    totalProjects,
    lastProject
} from "../controllers/project.controller.js";
import { verifyLogin } from "../middlewares/oauth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/createProject").post(
    verifyLogin, 
    upload.fields([
        { name: "projectImage", maxCount: 1 },
        { name: "reviewImage", maxCount: 1 }
    ]), 
    createProject
);

router.route("/getProjects").get(getAllProjects);

router.route("/getProject/:projectId").get(getProjectById);

router.route("/updateProject/:projectId").put(
    verifyLogin, 
    upload.fields([
        { name: "projectImage", maxCount: 1 },
        { name: "reviewImage", maxCount: 1 }
    ]), 
    updateProject
);

router.route("/deleteProject/:projectId").delete(verifyLogin, deleteProject);

router.route("/totalProjects").get(totalProjects);

router.route("/lastProject").get(lastProject);

export default router;