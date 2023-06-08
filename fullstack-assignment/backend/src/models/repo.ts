import { AppDataSource } from "../utils/db";
import { Book } from "./book";
import { Order } from "./order";
import { Tag } from "./tag";
import { User } from "./user";
import { Writer } from "./writer";

export const bookRepo = AppDataSource.getRepository(Book);
export const orderRepo = AppDataSource.getRepository(Order);
export const userRepo = AppDataSource.getRepository(User);
export const tagRepo = AppDataSource.getRepository(Tag);
export const writerRepo = AppDataSource.getRepository(Writer);
