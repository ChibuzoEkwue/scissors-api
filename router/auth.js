import { Router } from "express";
import { createUser, login } from "../controllers/auth.js";

const route = Router();

route.post("/signup", createUser);
route.post("/login", login);

export default route;
