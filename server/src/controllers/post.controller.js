import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Post from "../models/post.model.js";
import { uploadOnCloudinary, deleteFromCloudinary, getPublicId } from "../utils/cloudinary.js"
import mongoose from "mongoose";

const bufferToBase64 = (buffer, mimetype) =>
    `data:${mimetype};base64,${buffer.toString("base64")}`;

const createPost = asyncHandler(async (req, res, next) => {
    const { discription } = req.body;
    if (!req.file) {
        throw new ApiError(400, "Image is required");
    }
    const {buffer, mimetype} = req.file;
    const base64Image = bufferToBase64(buffer, mimetype);
    const uploadResult = await uploadOnCloudinary(base64Image, "image");
    const imgMongo = uploadResult.secure_url;

    const post = await Post.create({
        discription : discription || "",
        img : imgMongo,
    });

    if (!post) {
        throw new ApiError(500, "Post creation failed");
    }

    return res.status(201).json(new ApiResponse(201, post, "Post created successfully"));
});

const getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    if (!posts) {
        throw new ApiError(404, "No posts found");
    }   
    return res.status(200).json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

const editPost = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const { discription } = req.body;

    const post = await Post.findByIdAndUpdate(postId, { discription }, { new: true });
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    return res.status(200).json(new ApiResponse(200, post, "Post updated successfully"));
});

const deletePost = asyncHandler(async (req, res, next) => {
    const { postId } = req.params;

    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.img) {
        const postPublicId = getPublicId(post.img);
        await deleteFromCloudinary(postPublicId);
    }

    return res.status(200).json(new ApiResponse(200, post, "Post deleted successfully"));
});

export {
    createPost,
    getAllPosts,
    editPost,
    deletePost
};