import { z } from "zod";

//Define o schema da Relação Produto
export const ProdSchema = z.object({
    code: z.string().nonempty(),
    name: z.string().nonempty(),
    value: z.number()
});