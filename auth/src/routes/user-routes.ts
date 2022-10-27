import { Router } from "express";

import { signin, signout, signup, currentUser } from "../controllers/user-controllers";

const router = Router();

router.get("/currentuser", currentUser);

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/signout", signout);

export { router as userRouter };