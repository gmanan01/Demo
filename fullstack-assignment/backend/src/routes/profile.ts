import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { userRepo } from "../models/repo";
import { RemovePass } from "../utils/remove-pass";

const profileRouter = Router();

profileRouter.use(authMiddleware);

profileRouter.get("/", async (req, res) => {
  const userId = res.locals.user.id;
  const user = (await userRepo.findOneBy({
    id: userId,
  }))!;
  res.json({ user: RemovePass(user) });
});

export default profileRouter;
