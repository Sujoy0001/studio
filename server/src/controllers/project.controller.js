import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Project from "../models/project.model.js";
import Review from "../models/review.model.js";
import { uploadOnCloudinary, deleteFromCloudinary, getPublicId } from "../utils/cloudinary.js"
import mongoose from "mongoose";

const bufferToBase64 = (buffer, mimetype) =>
    `data:${mimetype};base64,${buffer.toString("base64")}`;

const createProject = asyncHandler(async (req, res, next) => {
    const { name, description, tech, review, liveLink, category } = req.body;
    if (!name || !category || !tech.length || !liveLink || !review) {
        throw new ApiError(400, "Name, description, tech, liveLink, and review are required");
    }

    const techArray = Array.isArray(tech) ? tech : JSON.parse(tech || '[]');

    let reviewData;
    try {
        reviewData = typeof review === 'string' ? JSON.parse(review) : review;
    } catch (error) {
        throw new ApiError(400, "Invalid review data format");
    }

    if (!reviewData.name || !reviewData.role || !reviewData.text) {
        throw new ApiError(400, "Review name, role, and text are required");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let reviewImgUrl = "";
        if (req.files?.reviewImage && req.files.reviewImage[0]) {
            const reviewImageFile = req.files.reviewImage[0];
            const reviewImageBase64 = bufferToBase64(reviewImageFile.buffer, reviewImageFile.mimetype);
            const reviewImageUpload = await uploadOnCloudinary(reviewImageBase64);
            reviewImgUrl = reviewImageUpload.url;
        }

        const [savedReview] = await Review.create([{
            img: reviewImgUrl,
            name: reviewData.name,
            role: reviewData.role,
            text: reviewData.text
        }], { session });

        let projectImgUrl = "";
        if (req.files?.projectImage && req.files.projectImage[0]) {
            const projectImageFile = req.files.projectImage[0];
            const projectImageBase64 = bufferToBase64(projectImageFile.buffer, projectImageFile.mimetype);
            const projectImageUpload = await uploadOnCloudinary(projectImageBase64);
            projectImgUrl = projectImageUpload.url;
        } else {
            throw new ApiError(400, "Project image is required");
        }

        const [savedProject] = await Project.create([{
            name,
            img: projectImgUrl,
            description: description || "",
            tech: techArray,
            review: savedReview._id,
            liveLink,
            category
        }], { session });

        await session.commitTransaction();

        const projectWithReview = await Project.aggregate([
            {
                $match: {
                    _id: savedProject._id
                }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "review",
                    foreignField: "_id",
                    as: "reviewData"
                }
            },
            {
                $unwind: {
                    path: "$reviewData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    name: 1,
                    img: 1,
                    description: 1,
                    tech: 1,
                    liveLink: 1,
                    category: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    review: {
                        _id: "$reviewData._id",
                        img: "$reviewData.img",
                        name: "$reviewData.name",
                        role: "$reviewData.role",
                        text: "$reviewData.text",
                        createdAt: "$reviewData.createdAt",
                        updatedAt: "$reviewData.updatedAt"
                    }
                }
            }
        ]);

        if (!projectWithReview.length) {
            throw new ApiError(500, "Failed to retrieve created project");
        }

        return res.status(201).json(
            new ApiResponse(201, projectWithReview[0], "Project and review created successfully")
        );

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
});

const getAllProjects = asyncHandler(async (req, res, next) => {
    const projects = await Project.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "review",
                foreignField: "_id",
                as: "reviewData"
            }
        },
        {
            $unwind: {
                path: "$reviewData",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                name: 1,
                img: 1,
                description: 1,
                tech: 1,
                liveLink: 1,
                category: 1,
                createdAt: 1,
                updatedAt: 1,
                review: {
                    _id: "$reviewData._id",
                    img: "$reviewData.img",
                    name: "$reviewData.name",
                    role: "$reviewData.role",
                    text: "$reviewData.text",
                    createdAt: "$reviewData.createdAt",
                    updatedAt: "$reviewData.updatedAt"
                }
            }
        },
        {
            $sort: { createdAt: -1 }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(200, projects, "All projects fetched successfully")
    );
});

const getProjectById = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new ApiError(400, "Invalid project ID");
    }

    const project = await Project.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(projectId) }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "review",
                foreignField: "_id",
                as: "reviewData"
            }
        },
        {
            $unwind: {
                path: "$reviewData",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);

    if (!project.length) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json(new ApiResponse(200, project[0], "Project fetched successfully"));
});

const updateProject = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;
    const { name, description, tech, review, liveLink, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new ApiError(400, "Invalid project ID");
    }

    const existingProject = await Project.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(projectId)
            }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "review",
                foreignField: "_id",
                as: "reviewData"
            }
        },
        {
            $unwind: {
                path: "$reviewData",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);

    if (!existingProject.length) {
        throw new ApiError(404, "Project not found");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const project = existingProject[0];
        let reviewId = project.review;
        let projectImgUrl = project.img;
        let reviewImgUrl = project.reviewData?.img || "";

        if (req.files?.projectImage && req.files.projectImage[0]) {
            if (project.img) {
                const publicId = getPublicId(project.img);
                await deleteFromCloudinary(publicId);
            }

            const projectImageFile = req.files.projectImage[0];
            const projectImageBase64 = bufferToBase64(projectImageFile.buffer, projectImageFile.mimetype);
            const projectImageUpload = await uploadOnCloudinary(projectImageBase64);
            projectImgUrl = projectImageUpload.url;
        }

        if (review) {
            let reviewData;
            try {
                reviewData = typeof review === 'string' ? JSON.parse(review) : review;
            } catch (error) {
                throw new ApiError(400, "Invalid review data format");
            }

            if (req.files?.reviewImage && req.files.reviewImage[0]) {
                if (project.reviewData?.img) {
                    const publicId = getPublicId(project.reviewData.img);
                    await deleteFromCloudinary(publicId);
                }

                const reviewImageFile = req.files.reviewImage[0];
                const reviewImageBase64 = bufferToBase64(reviewImageFile.buffer, reviewImageFile.mimetype);
                const reviewImageUpload = await uploadOnCloudinary(reviewImageBase64);
                reviewImgUrl = reviewImageUpload.url;
            }

            await Review.findByIdAndUpdate(
                reviewId,
                {
                    $set: {
                        img: reviewImgUrl,
                        name: reviewData.name || project.reviewData.name,
                        role: reviewData.role || project.reviewData.role,
                        text: reviewData.text || project.reviewData.text
                    }
                },
                { session }
            );
        }

        const techArray = tech ? (Array.isArray(tech) ? tech : JSON.parse(tech || '[]')) : project.tech;

        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            {
                $set: {
                    name: name || project.name,
                    img: projectImgUrl,
                    description: description || project.description,
                    tech: techArray,
                    liveLink: liveLink || project.liveLink,
                    category: category || project.category
                }
            },
            { 
                session,
                new: true 
            }
        );

        await session.commitTransaction();

        const projectWithReview = await Project.aggregate([
            {
                $match: {
                    _id: updatedProject._id
                }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "review",
                    foreignField: "_id",
                    as: "reviewData"
                }
            },
            {
                $unwind: {
                    path: "$reviewData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    name: 1,
                    img: 1,
                    description: 1,
                    tech: 1,
                    liveLink: 1,
                    category: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    review: {
                        _id: "$reviewData._id",
                        img: "$reviewData.img",
                        name: "$reviewData.name",
                        role: "$reviewData.role",
                        text: "$reviewData.text",
                        createdAt: "$reviewData.createdAt",
                        updatedAt: "$reviewData.updatedAt"
                    }
                }
            }
        ]);

        if (!projectWithReview.length) {
            throw new ApiError(500, "Failed to retrieve updated project");
        }

        return res.status(200).json(
            new ApiResponse(200, projectWithReview[0], "Project updated successfully")
        );

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
});

const deleteProject = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new ApiError(400, "Invalid project ID");
    }

    const project = await Project.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(projectId)
            }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "review",
                foreignField: "_id",
                as: "reviewData"
            }
        },
        {
            $unwind: {
                path: "$reviewData",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);

    if (!project.length) {
        throw new ApiError(404, "Project not found");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const projectData = project[0];

        if (projectData.img) {
            const projectPublicId = getPublicId(projectData.img);
            await deleteFromCloudinary(projectPublicId);
        }

        if (projectData.reviewData?.img) {
            const reviewPublicId = getPublicId(projectData.reviewData.img);
            await deleteFromCloudinary(reviewPublicId);
        }

        await Project.findByIdAndDelete(projectId, { session });

        if (projectData.review) {
            await Review.findByIdAndDelete(projectData.review, { session });
        }

        await session.commitTransaction();

        return res.status(200).json(
            new ApiResponse(200, null, "Project and associated review deleted successfully")
        );

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
});

const totalProjects = asyncHandler(async (req, res, next) => {
    const count = await Project.countDocuments();
    return res.status(200).json(
        new ApiResponse(200, { totalProjects: count }, "Total projects count fetched successfully")
    );
});

const lastProject = asyncHandler(async (req, res, next) => {
    const project = await Project.findOne().sort({ createdAt: -1 });
    if (!project) {
        return res.status(200).json(new ApiResponse(404, {lastData : null}, "not found any project"));
    }
    return res.status(200).json(new ApiResponse(200, {lastData : project.createdAt}, "Last project fetched successfully"));
});

export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    totalProjects,
    lastProject
};