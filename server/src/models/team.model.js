import { Schema,model } from "mongoose";

const teamSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    skills : [String],
    email : {
        type : String,
        required : true,
        unique : true,
    },
    links : {
        type : Schema.Types.ObjectId,
        ref : "Link",
    },
    img : {
        type : String,
    },
    urlName : {
        type : String,
        required : true,
        unique : true,
    }
},{timestamps : true});

const Team = model("Team",teamSchema);
export default Team;