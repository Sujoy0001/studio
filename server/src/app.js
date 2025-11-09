import express from "express"
import cors from "cors"
import helmet from "helmet";
import cookieParser from "cookie-parser"

const app = express()

const allowedOrigins = [
  process.env.FIRST_ORIGIN,
  process.env.SECOND_ORIGIN,
].filter(Boolean);

app.use((req, res, next) => {
  console.log("🧭 Incoming Origin header:", req.headers.origin);
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      console.log("🚫 CORS: request has no Origin header — denying (for safety)");
      return callback(new Error("CORS: No Origin header"));
    }

    if (allowedOrigins.includes(origin)) {
      console.log("✅ CORS Allowed origin:", origin);
      callback(null, origin);
    } else {
      console.log("❌ CORS Blocked origin:", origin, "Allowed:", allowedOrigins);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
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