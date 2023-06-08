import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";
import { authValidation } from "../validation/auth";
import { User } from "../models/user";
import { hash } from "../utils/hash";
import { createJwtToken } from "../utils/token";
import { userRepo } from "../models/repo";
import { RemovePass } from "../utils/remove-pass";
const authRouter = Router();

authRouter.post(
  "/register",
  validateRequestBody(authValidation),
  async (req, res) => {
    try {
      const user = await userRepo.save({
        balance: 100,
        password: hash(req.body.password),
        email: req.body.email,
      });
      res.json({ user: RemovePass(user) });
    } catch {
      return res
        .status(401)
        .send({ error: "User Already Exist Please Login!" });
    }
  }
);

authRouter.post(
  "/login",
  validateRequestBody(authValidation),
  async (req, res) => {
    const user = await userRepo.findOne({
      where: {
        email: req.body.email,
        password: hash(req.body.password),
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createJwtToken({ email: user.email, id: user.id });
    res.json({
      token,
      user: RemovePass(user),
    });
  }
);

export default authRouter;
