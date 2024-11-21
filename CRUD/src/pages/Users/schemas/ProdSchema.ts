import { z } from "zod";

export const ProdSchema = z.object({
    name: z.string().nonempty(),
    value: z.number()
});