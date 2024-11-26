import { z } from "zod";

//Define o schema da Relação Compra
export const ComprasSchema = z.object({
    date: z.string().nonempty(),
    value: z.number().nonnegative(),
    quantity: z.number().nonnegative()
});