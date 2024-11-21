import { z } from 'zod';
import { UserSchema } from '../schemas/UserShema';

export type User = {
  id: string
  name: string
  cpf: string
  phone: string
}

export type TUserShema = z.infer<typeof UserSchema>