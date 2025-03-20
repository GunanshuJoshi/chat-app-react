import express from "express";
import { configDotenv } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { mongoDB } from "./lib/mongodb.lib.js";
import cookieParser from "cookie-parser";
import { authorizationChecker } from "./middleware/authorization.middleware.js";
import cors from "cors";
import { app, server } from "./lib/socket.lib.js";
import path from "path";

configDotenv();

const __dirname = path.resolve();

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
const router = express.Router();
app.use("/api", router);

router.get("/test", (req, res) => {
  res.status(200).send("Backend testing is successfull");
});

router.use("/auth", authRoutes);
router.use("/messages", authorizationChecker, messageRoutes);

if (process.env.NODE_ENV === "prod") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  mongoDB();
  console.log("Backend running on ", PORT);
});
