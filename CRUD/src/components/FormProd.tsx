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
import { ProdSchema } from '../pages/Users/schemas/ProdSchema';  
import { zodResolver } from '@hookform/resolvers/zod';
import { Prod } from '../pages/Users/types/Prod';
import { api } from '../libs/axios';
  
  const FormProd = () => {
    console.log('Renderizou Form');
    const { code } = useParams();
    const navigate = useNavigate();
  
    const {
      control,
      register,
      handleSubmit,
      formState: { errors },
      reset,
      watch // Adicionando reset
    } = useForm<Prod>({
      criteriaMode: 'all',
      mode: 'all',
      resolver: zodResolver(ProdSchema),
      defaultValues: {
        name: '',
        value: 0
      },
    });
  
    const onSubmit = async (data: Prod) => {
      console.log('Dados enviados:', data);
      if (!code) {
        // Criar um novo usuário
        if(data.value >= 0){
          await api.post("/api/products", {
            name: data.name,
            value: data.value
          });}
      } else {
        // Atualizar um usuário
        if(data.value >= 0){
         await api.put("/api/products/" + code, {
          name: data.name,
          value: data.value
         });}
      }
  
      navigate('/products/');
    };

    useEffect(() => {
      if (!code) return;
    
      const fetchProd = async () => {
        try {
          console.log("Buscando produto com code:", code);
          const { data } = await api.get(`/api/products/${code}`);
          console.log("Produto encontrado:", data);
    
          reset({
            name: data.name || "",
            value: data.value || 0
          });
        } catch (error) {
          console.error("Erro ao buscar produto:", error);
        }
      };
    
      fetchProd();
    }, [code, reset, control]);
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
            label="Nome"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ marginBottom: 2 }}
            {...register('name')}
            InputLabelProps={{
              shrink: !!errors.name || !!watch('name'),  // Faz a label ficar acima quando o valor estiver preenchido
            }}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ marginBottom: 2 }}>
            <Controller
              control={control}
              name="value"
              defaultValue={0} // Inicia com valor 0
    render={({ field }) => (
      <FormControl fullWidth>
        <TextField
          label="Valor"
          fullWidth
          type="number" // Força o valor a ser tratado como número
          error={!!errors.value}
          helperText={errors.value?.message}
          {...field}
          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")} // Converte valor para número ou vazio
        />
      </FormControl>
    )}
  />
</Stack>
  
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button type="submit" variant="contained" size="large">
              {code ? 'Atualizar Produto PET' : 'Criar Produto PET'}
            </Button>
            <Button component={RouterLink} to="/products">
              Cancelar
            </Button>
          </Stack>
        </Box>
      </>
    );
  };
  
  export default FormProd;
  