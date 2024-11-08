import './config.js';
import './db.js';
import express from "express";
import session from "express-session";
import passport from "passport";
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import snippetRoute from "./routes/snippet.route.js";
import { User } from "./models/user.js";
import cors from "cors";

const app = express();
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use(
	session({
		secret: process.env.SESSION_SECRET_KEY, // Replace with a strong secret
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, _, next) => {
    console.log(req.path.toUpperCase(), req.body);
    next();
  });

app.use("/api/auth", authRoute);
app.use("/api/snippets", snippetRoute);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server started successfully on PORT: ${PORT}!`);
});