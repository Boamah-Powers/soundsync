import './config/config.js';
import express from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import snippetRoute from "./routes/snippet.route.js";
import commentRoute from "./routes/comment.route.js";
import userRoute from "./routes/user.route.js";
import collaborationRoute from "./routes/collaboration.route.js";
import { User } from "./models/user.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware configuration
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Session and Passport configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Logging middleware
// app.use((req, _, next) => {
//   console.log(req.path.toUpperCase(), req.body);
//   next();
// });

// Routes
app.use("/api/auth", authRoute);
app.use("/api/snippets", snippetRoute);
app.use("/api/comments", commentRoute);
app.use("/api/users", userRoute);
app.use("/api/collaborations", collaborationRoute);

// Graceful shutdown function
export const closeApp = async (server) => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await mongoose.connection.close();
  console.log("App and database connection closed.");
};

export default app;