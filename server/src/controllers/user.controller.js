import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { options } from "../constants.js"

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }
    const isAllowed =
        (email === process.env.EMAIL && password === process.env.PASSWORD) ||
        (email === process.env.REVOX_EMAIL && password === process.env.REVOX_PASSWORD) ||
        (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD);

    if (!isAllowed) {
        throw new ApiError(401, "Invalid credentials");
    }
    let user = await User.findOne({ email });
    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid password");
        }
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            email,
            password: hashedPassword
        })
        if (!user) {
            throw new ApiError(500, "User creation failed");
        }
    }

    const accessToken = jwt.sign(
        {
            _id: user._id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    const refreshToken = jwt.sign(
        {
            _id: user._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200, {
            accessToken, refreshToken, user: {
                _id: user._id,
                email: user.email,
            }
        }, "Login successful"));
})

const currentUser = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully"));
})

const logoutUser = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, null, "Logout successful"));
})

export { loginUser, currentUser, logoutUser }