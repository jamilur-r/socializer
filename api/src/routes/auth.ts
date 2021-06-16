import express from "express";
import { getAllUser, signInUser, signUpUser } from "../controller/auth";
import { validateToken } from "../middleware/validate-token";

export const AuthRouter = express.Router();


AuthRouter.get("/", validateToken, getAllUser);
AuthRouter.post("/signin", signInUser);
AuthRouter.post("/signup", signUpUser);
