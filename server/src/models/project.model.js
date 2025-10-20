import { Schema,model } from "mongoose";

const projectSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    img : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    tech : [String],
    review : [{
        type : Schema.Types.ObjectId,
        ref : "Review",
    }],
    liveLink : {
        type : String,
    }
}, { timestamps : true });

const Project = model("Project",projectSchema);
export default Project;