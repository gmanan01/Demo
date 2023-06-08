import { Router } from "express";
import authRouter from "./auth";
import bookRouter from "./book";
import profileRouter from "./profile";
import orderRouter from "./order";
import tagRouter from "./tag";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/book", bookRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use("/tag", tagRouter);

export default apiRouter;
