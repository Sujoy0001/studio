import { Schema, model } from "mongoose";

const linkSchema = new Schema({
    links: {
        linkedin: { type: String },
        github: { type: String },
        portfolio: { type: String },
    },
    socials: {
        facebook: { type: String },
        instagram: { type: String },
        x: { type: String },
        discord: { type: String },
    },
}, { timestamps: true });

const Link = model("Link", linkSchema);
export default Link;