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
import { UserSchema } from '../pages/Users/schemas/UserShema';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '../pages/Users/types/User';
import { api } from '../libs/axios';

const FormUser = () => {
  console.log('Renderizou Form');
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch // Adicionando reset
  } = useForm<User>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(UserSchema),
    defaultValues: {
      phone: '',
      name: '',
      cpf: ''
    },
  });

  const onSubmit = async (data: User) => {
    console.log('Dados enviados:', data);
    if (!id) {
      // Criar um novo usuário
      await api.post("/api/users", {
        name: data.name,
        cpf: data.cpf,
        phone: data.phone
      });
    } else {
      // Atualizar um usuário
       await api.put("/api/users/" + id, {
        name: data.name,
        cpf: data.cpf,
        phone: data.phone
       });
    }

    navigate('/users/');
  };

  useEffect(() => {
    if (!id) return;
  
    const fetchUser = async () => {
      try {
        console.log("Buscando usuário com ID:", id);
        const { data } = await api.get(`/api/users/${id}`);
        console.log("Usuário encontrado:", data);
  
        reset({
          name: data.name || "",
          cpf: data.cpf || "",
          phone: data.phone || "",
        });
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
  
    fetchUser();
  }, [id, reset, control]);
  
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
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ marginBottom: 2 }}
          {...register('name')}
          InputLabelProps={{
            shrink: !!errors.name || !!watch('name'),  // Faz a label ficar acima quando o valor estiver preenchido
          }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: 2 }}>
          <Controller
            control={control}
            name="cpf"
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  label="CPF"
                  fullWidth
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
                  {...field}
                />
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ marginBottom: 2 }}>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  label="Celular"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
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

export default FormUser;
