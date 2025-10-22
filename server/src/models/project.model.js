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
    tech : [{
        type : String,
        required : true,
    }],
    review : {
        type : Schema.Types.ObjectId,
        ref : "Review",
    },
    liveLink : {
        type : String,
    },
    category : {
        type : String,
        required : true,
    }
}, { timestamps : true });

const Project = model("Project",projectSchema);
export default Project;