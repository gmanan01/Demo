import { DataSource } from "typeorm";
import { User } from "../models/user";
import { Book } from "../models/book";
import { Order } from "../models/order";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "../config";
import { Tag } from "../models/tag";
import { Writer } from "../models/writer";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Book, Order, Tag, Writer],
  subscribers: [],
  migrations: [],
});

export const initDb = async () => {
  try {
    await AppDataSource.initialize();
  } catch (e) {
    console.error(e);
  }
};
