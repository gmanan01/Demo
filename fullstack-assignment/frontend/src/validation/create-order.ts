import { z } from "zod";

export const createOrderValidation = z.object({
  bookId: z.number().int().positive(),
});
