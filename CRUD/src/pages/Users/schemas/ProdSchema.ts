import { z } from "zod";

export const ProdSchema = z.object({
    code: z.string().nonempty(),
    name: z.string().nonempty(),
    value: z.number()
});