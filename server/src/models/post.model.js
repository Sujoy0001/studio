import { Schema, model } from "mongoose";

const postSchema = new Schema({
    discription : {
        type : String,
    },
    img : {
        type : String,
        required : true,
    }
}, { timestamps : true });

const Post = model("Post", postSchema);
export default Post;