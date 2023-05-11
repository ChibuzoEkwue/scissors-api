import { Router } from "express";

import currentUser from "../middleware/currentUser.js";
import {
	createCustomLink,
	createLink,
	deleteLink,
	linksDetail,
	myLinks,
	updateLinks,
} from "../controllers/linksController.js";

const route = Router();

route.post("/", currentUser, createLink);
route.get("/", currentUser, myLinks);
route.post("/custom", currentUser, createCustomLink);
route.get("/:id", currentUser, linksDetail);
route.put("/:id", currentUser, updateLinks);
route.delete("/:id", currentUser, deleteLink);

export default route;
