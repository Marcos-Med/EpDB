import { z } from 'zod';
import { ProdSchema } from '../schemas/ProdSchema';

//Define o tipo Produto
export type Prod = {
  code: string
  name: string
  value: number
}

export type TProdShema = z.infer<typeof ProdSchema>