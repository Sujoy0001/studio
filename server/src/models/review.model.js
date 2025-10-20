import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    img : { type : String },
    name : { type : String },
    role : { type : String },
    text : { type : String },
}, { timestamps : true });

const Review = model("Review", reviewSchema);
export default Review;
