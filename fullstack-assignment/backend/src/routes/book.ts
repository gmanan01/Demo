import { Router } from "express";
import { bookRepo } from "../models/repo";
import authMiddleware from "../middleware/authMiddleware";
import { z } from "zod";
import { validateRequestQuery } from "zod-express-middleware";

const bookRouter = Router();
bookRouter.use(authMiddleware);

bookRouter.get(
  "/",
  validateRequestQuery(
    z.object({
      page: z.coerce.number().int(),
      tagId: z.coerce.number().int().optional(),
    })
  ),
  async (req, res) => {
    const page = Number(req.query.page);
    const limit = 10;
    const skip = page * limit;
    const tagId = req.query.tagId;

    const where = tagId ? { tags: { id: tagId } } : {};

    const books = await bookRepo.find({
      relations: ["tags", "writer"],
      skip,
      where,
      take: limit,
    });

    const totalBooks = await bookRepo.count({
      where,
    });
    const hasMore = totalBooks > skip + limit;

    res.json({ books, totalBooks, hasMore, nextPage: page + 1 });
  }
);

export default bookRouter;
