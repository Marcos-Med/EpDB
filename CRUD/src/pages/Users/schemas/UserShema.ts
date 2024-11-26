import { z } from 'zod';

//Define o schema da Relação Usuário
export const UserSchema = z.object({
  name: z.string().nonempty('Este campo é obrigatório'),
  cpf: z.string().nonempty('Este campo é obrigatório'),
  phone: z.string().nonempty('Este campo é obrigatório')
});