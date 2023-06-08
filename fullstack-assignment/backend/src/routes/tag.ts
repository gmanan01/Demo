import { Router } from "express";
import { bookRepo, tagRepo } from "../models/repo";
import authMiddleware from "../middleware/authMiddleware";
import { z } from "zod";
import { validateRequestQuery } from "zod-express-middleware";

const bookRouter = Router();
bookRouter.use(authMiddleware);

bookRouter.get("/", async (req, res) => {
  const tags = await tagRepo.find();
  res.json({ tags });
});

export default bookRouter;
