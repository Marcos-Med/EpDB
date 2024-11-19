import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { DevTool } from '@hookform/devtools';
import { useLocalStorage } from 'usehooks-ts';

import { UserSchema } from '../pages/Users/schemas/UserShema';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '../pages/Users/types/User';
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
  console.log('Renderizou Form');
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset, // Adicionando reset
  } = useForm<User>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(UserSchema),
    defaultValues: {
      document: '',
      email: '',
      fullName: '',
      mobile: '',
    },
  });

  const onSubmit = (data: User) => {
    console.log('Dados enviados:', data);
    if (!id) {
      // Criar um novo usuário
      const newUser = { ...data, id: uuidv4() }; // Usando uuid para gerar um ID único
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, newUser];
        return updatedUsers; // Retorna a nova versão do estado
      });
    } else {
      // Atualizar um usuário existente
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        console.error('Usuário não encontrado');
        return;
      }

      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...data, id };
      setUsers(updatedUsers); // Atualiza o estado com a versão mais recente
    }

    navigate('/users/');
  };

  useEffect(() => {
    if (!id) return;

    console.log('Buscando usuário com ID:', id);
    const user = users.find((user) => user.id === id);

    if (!user) {
      console.error('Usuário não encontrado');
      return;
    }

    console.log('Usuário encontrado:', user);

    // Preencher o formulário com os dados do usuário
    reset(user); // Utilizando `reset` para preencher corretamente os valores
  }, [id, users, reset]); // Certifique-se de que a dependência users está correta

  return (
    <>
    <DevTool control={control} placement="top-right" />
      <Box
        component="form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 2 }}
      >
        <TextField
          label="Nome Completo"
          fullWidth
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          sx={{ marginBottom: 2 }}
          {...register('fullName')}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: 2 }}>
          <Controller
            control={control}
            name="document"
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  label="CPF"
                  fullWidth
                  error={!!errors.document}
                  helperText={errors.document?.message}
                  {...field}
                />
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: 2 }}>
          <TextField
            label="E-mail"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />

          <Controller
            control={control}
            name="mobile"
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  label="Celular"
                  fullWidth
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  {...field}
                />
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button type="submit" variant="contained" size="large">
            {id ? 'Atualizar Usuário' : 'Criar Usuário'}
          </Button>
          <Button component={RouterLink} to="/users">
            Cancelar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Form;
