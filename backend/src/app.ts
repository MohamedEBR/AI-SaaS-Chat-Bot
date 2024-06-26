import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = express();

//middlewares
app.use(
  cors({ origin:"https://ai-mern-chatbot.netlify.app", credentials: true })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET as string));


app.use("/api/v1", appRouter);

export default app;
