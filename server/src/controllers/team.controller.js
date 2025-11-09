import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Team from "../models/team.model.js";
import Link from "../models/link.model.js";
import { uploadOnCloudinary, deleteFromCloudinary, getPublicId } from "../utils/cloudinary.js"
import mongoose from "mongoose";

const bufferToBase64 = (buffer, mimetype) =>
  `data:${mimetype};base64,${buffer.toString('base64')}`;

const createTeamMember = asyncHandler(async (req, res, next) => {
  const { name, role, description, email, urlName } = req.body;
  let { skills, links, img } = req.body;

  let skillParsed = [];
  let linksParsed = {};

  try {
    if (typeof skills === 'string' && skills.trim() !== '') {
      skillParsed = JSON.parse(skills);
    } else if (Array.isArray(skills)) {
      skillParsed = skills;
    } else {
      skillParsed = [];
    }
  } catch (err) {
    throw new ApiError(400, 'Invalid JSON format for skills');
  }

  try {
    if (typeof links === 'string' && links.trim() !== '') {
      linksParsed = JSON.parse(links);
    } else if (typeof links === 'object' && links !== null) {
      linksParsed = links;
    } else {
      linksParsed = {};
    }
  } catch (err) {
    throw new ApiError(400, 'Invalid JSON format for links');
  }

  if (!name || !role || !email || !urlName) {
    throw new ApiError(400, 'Name, role, email and urlName are required');
  }
  if (!Array.isArray(skillParsed) || skillParsed.length === 0) {
    throw new ApiError(400, 'At least one skill is required');
  }

  const existingMember = await Team.findOne({ email });
  if (existingMember) {
    throw new ApiError(409, 'Team member with this email already exists');
  }
  const checkUrlName = await Team.findOne({ urlName });
  if (checkUrlName) {
    throw new ApiError(409, 'Team member with this urlName already exists');
  }

  let imgMongo = img || null;

  if (req.file && req.file.buffer) {
    const { buffer, mimetype } = req.file;
    const base64Image = bufferToBase64(buffer, mimetype);

    const uploadResult = await uploadOnCloudinary(base64Image, 'image');
    imgMongo = uploadResult.secure_url;
  }

  // If you previously stored links in a separate Link collection, create it here
  const linkDoc = await Link.create({
    links: {
      linkedin: linksParsed.linkedin || '',
      github: linksParsed.github || '',
      portfolio: linksParsed.portfolio || '',
    },
    socials: {
      facebook: linksParsed.facebook || '',
      instagram: linksParsed.instagram || '',
      x: linksParsed.x || '',
      discord: linksParsed.discord || '',
    },
  });

  // Create team member using parsed values
  const teamMember = await Team.create({
    name,
    role,
    description,
    skills: skillParsed,
    email,
    links: linkDoc._id,
    img: imgMongo,
    urlName,
  });

  if (!teamMember) {
    throw new ApiError(500, 'Team member creation failed');
  }

  return res.status(201).json(new ApiResponse(201, teamMember, 'Team member created successfully'));
});


const getAllTeamMembers = asyncHandler(async (req, res, next) => {
    const teamMembers = await Team.aggregate([
        {
            $lookup: {
                from: "links",
                localField: "links",
                foreignField: "_id",
                as: "linkDetails"
            }
        },
        {
            $unwind: {
                path: "$linkDetails",
                preserveNullAndEmptyArrays: true
            }
        }
    ])
    if (!teamMembers) {
        throw new ApiError(500, "Failed to fetch team members");
    }

    return res.status(200).json(new ApiResponse(200, teamMembers, "Team members fetched successfully"));
});

const getTeamMemberById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid team member ID");
    }

    const teamMember = await Team.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "links",
                localField: "links",
                foreignField: "_id",
                as: "linkDetails"
            }
        }
    ])
    if (!teamMember || teamMember.length === 0) {
        throw new ApiError(404, "Team member not found");
    }
    return res.status(200).json(new ApiResponse(200, teamMember[0], "Team member fetched successfully"));
});

const editTeamMember = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, role, description, skills, email, links, img, urlName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid team member ID");
    }
    const teamMember = await Team.findById(id);
    if (!teamMember) {
        throw new ApiError(404, "Team member not found");
    }

    let imgMongo = img;
    if (req.file) {
        if (teamMember.img) {
            const publicId = getPublicId(teamMember.img);
            await deleteFromCloudinary(publicId, "image");
        }
        const { buffer, mimetype } = req.file;
        const base64Image = bufferToBase64(buffer, mimetype);
        const uploadResult = await uploadOnCloudinary(base64Image, "image");
        imgMongo = uploadResult.secure_url;
    }
    console.log("Links data for update:", links);
    const linkId = teamMember.links;
    let newLinkDoc = null;
    if (links) {
        if (linkId) {
            await Link.findByIdAndUpdate(linkId, {
                links: {
                    linkedin: links.linkedin,
                    github: links.github,
                    portfolio: links.portfolio,
                },
                socials: {
                    facebook: links.facebook,
                    instagram: links.instagram,
                    x: links.x,
                    discord: links.discord,
                },
            }, { new: true });
        } else {
            newLinkDoc = await Link.create({
                links: {
                    linkedin: links.linkedin || "",
                    github: links.github || "",
                    portfolio: links.portfolio || "",
                },
                socials: {
                    facebook: links.facebook || "",
                    instagram: links.instagram || "",
                    x: links.x || "",
                    discord: links.discord || "",
                },
            });
            if (!newLinkDoc) {
                throw new ApiError(500, "Link creation failed");
            }
        }
    }

    const updatedTeamMember = await Team.findByIdAndUpdate(id, {
        name,
        role,
        description,
        skills,
        email,
        links: newLinkDoc ? newLinkDoc._id : linkId,
        img: imgMongo,
        urlName
    }, { new: true });

    if (!updatedTeamMember) {
        throw new ApiError(500, "Team member update failed");
    }

    return res.status(200).json(new ApiResponse(200, updatedTeamMember, "Team member updated successfully"));
});

const deleteTeamMember = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid team member ID");
    }

    const teamMember = await Team.findById(id);
    if (!teamMember) {
        throw new ApiError(404, "Team member not found");
    }
    if (teamMember.img) {
        const publicId = getPublicId(teamMember.img);
        await deleteFromCloudinary(publicId, "image");
    }
    await Team.findByIdAndDelete(id);
    await Link.findByIdAndDelete(teamMember.links);
    return res.status(204).json(new ApiResponse(204, null, "Team member deleted successfully"));
});

const totalTeamMembers = asyncHandler(async (req, res, next) => {
    const count = await Team.countDocuments();
    return res.status(200).json(
        new ApiResponse(200, { totalTeamMembers: count }, "Total team members count fetched successfully")
    );
});

export {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    editTeamMember,
    deleteTeamMember,
    totalTeamMembers
}