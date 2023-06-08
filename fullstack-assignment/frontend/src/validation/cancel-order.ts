import { z } from "zod";

export const cancelOrderValidation = z.object({
  orderId: z.number().int().positive(),
});
