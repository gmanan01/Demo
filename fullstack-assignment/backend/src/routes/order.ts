import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { bookRepo, orderRepo, userRepo } from "../models/repo";
import { User } from "../models/user";
import { AppDataSource } from "../utils/db";
import { processRequestBody } from "zod-express-middleware";
import { createOrderValidation } from "../validation/create-order";
import { Book } from "../models/book";
import { Order } from "../models/order";
import { cancelOrderValidation } from "../validation/cancel-order";

const orderRouter = Router();

orderRouter.use(authMiddleware);

orderRouter.get("/", async (req, res) => {
  const orders = await orderRepo.find({
    relations: ["book", "user"],
    select: {
      id: true,
      price: true,
      book: {
        id: true,
        name: true,
        imageUrl: true,
      },
      user: {
        id: true,
      },
    },
    where: {
      user: {
        id: res.locals.user.id,
      },
    },
  });

  res.json({ orders });
});

orderRouter.post(
  "/create-order",
  processRequestBody(createOrderValidation),
  async (req, res) => {
    await AppDataSource.transaction(async (manager) => {
      //Check If Book Exist
      const book = await manager.findOne(Book, {
        where: {
          id: req.body.bookId,
        },
      });

      if (!book) {
        return res.status(404).send("Book Not Found");
      }
      //Check If User Has Enough Balance
      const user = await manager.findOne(User, {
        where: {
          id: res.locals.user.id,
        },
      });
      if (!user || user.balance < book.price) {
        return res.status(401).send("Not Enough Balance");
      }
      //Create Order
      const order = await manager.save(Order, {
        book,
        user,
        price: book.price,
      });
      //Update User Balance
      await manager.update(User, user.id, {
        balance: user.balance - book.price,
      });
      res.json({ order });
    });
  }
);

orderRouter.post(
  "/cancel-order",
  processRequestBody(cancelOrderValidation),
  async (req, res) => {
    await AppDataSource.transaction(async (manager) => {
      const order = await manager.findOne(Order, {
        where: {
          id: req.body.orderId,
        },
        relations: ["user", "book"],
      });
      if (!order) {
        return res.status(404).send("Order Not Found");
      }
      console.log(order.user.id, res.locals);
      if (order.user.id !== res.locals.user.id) {
        return res.status(401).send("Unauthorized");
      }
      await manager.delete(Order, order.id);
      await manager.update(User, order.user.id, {
        balance: order.user.balance + order.price,
      });
      res.json({ order });
    });
  }
);

export default orderRouter;
