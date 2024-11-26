import { z } from 'zod';
import { ComprasSchema } from '../schemas/ComprasSchema';

//Define o tipo Compra
export type Compra = {
  user_id: string
  code_product: string
  date: string
  value: number
  quantity: number
}

export type TComprasShema = z.infer<typeof ComprasSchema>