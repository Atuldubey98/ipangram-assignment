import express, { Application, NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import mongoose from "mongoose";
import { CLIENT_URL, MONGO_URI, NODE_ENV, SESSION_SECRET } from "./config";
import userRouter from "./routes/user.routes";
import MongoStore from "connect-mongo";
import session, { SessionOptions } from "express-session";
import cors from "cors";
import profileRouter from "./routes/profile.routes";

const app: Application = express();
mongoose.connect(MONGO_URI);
app.use(express.json());
const whitelist = [CLIENT_URL];
const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
const sessionOptions: SessionOptions = {
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
  }),
};

if (NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(session(sessionOptions));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/profiles", profileRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "NOT_FOUND"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let message = "UNKNOWN_ERROR";
  let statusCode = 500;
  console.log(error);

  if (error instanceof mongoose.Error) {
    message = error.message;
    statusCode = 400;
  }

  if (isHttpError(error)) {
    message = error.message;
    statusCode = error.statusCode;
  }
  return res.status(statusCode).json({ message });
});
export default app;
