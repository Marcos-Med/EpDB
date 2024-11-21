import { z } from 'zod';
import { ComprasSchema } from '../schemas/ComprasSchema';

export type Compra = {
  user_id: string
  code_product: string
  date: string
  value: number
  quantity: number
}

export type TComprasShema = z.infer<typeof ComprasSchema>