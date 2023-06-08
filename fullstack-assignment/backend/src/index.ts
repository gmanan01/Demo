import Express from "express";
import apiRouter from "./routes/api";
import { PORT } from "./config";
import { initDb } from "./utils/db";
import { populate } from "dotenv";
import { populateDB } from "./utils/populate-db";
import cors from "cors";
const main = async () => {
  ///DATABASE INIT
  await initDb();

  const app = Express();

  //Middleware
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
  app.use(Express.json());
  app.use(Express.urlencoded({ extended: true }));

  //Routes
  app.use("/api", apiRouter);

  app.listen(PORT, () => {
    // populateDB();
    console.log(`Listening on port ${PORT}`);
  });
};

main();
