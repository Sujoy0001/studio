import express from "express"
import cors from "cors"
import helmet from "helmet";
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            ...(process.env.FIRST_ORIGIN ? [process.env.FIRST_ORIGIN] : []),
            ...(process.env.SECOND_ORIGIN ? [process.env.SECOND_ORIGIN] : [])
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
    credentials: true
}));
app.use(helmet());
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.router.js"
import teamRouter from "./routes/team.route.js"
import projectRouter from "./routes/project.route.js"
import postRouter from "./routes/post.route.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/team", teamRouter)
app.use("/api/v1/project", projectRouter)
app.use("/api/v1/post", postRouter)

app.get("/", (req, res) => {
    res.json({ message: "working" })
})


export { app }