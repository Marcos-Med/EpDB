import { z } from "zod";

export const ComprasSchema = z.object({
    date: z.string().nonempty(),
    value: z.number().nonnegative(),
    quantity: z.number().nonnegative()
});