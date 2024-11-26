import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { ProdSchema } from "../pages/Users/schemas/ProdSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prod } from "../pages/Users/types/Prod";
import { api } from "../libs/axios";

const FormProd = () => {
  console.log("Renderizou Form");
  const { code } = useParams();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Prod>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(ProdSchema),
    defaultValues: {
      name: "",
      value: 0,
      code: "", 
    },
  });

  const onSubmit = async (data: Prod) => {
    console.log("Dados enviados:", data);
    let flag = true;
    if (!code) {
      // Criar um novo produto
      if (data.value >= 0) {
        try{
         await api.post(`/api/products`, {
          name: data.name,
          value: data.value,
          code: data.code, 
        });
        }
        catch(error: any){
          if (error.response?.status === 500) {
            alert("Código de barras já cadastrado!");
            flag = false;
          } else {
            console.error("Erro inesperado:", error);
          }
        }
      }
    } else {
      // Atualizar um produto
      if (data.value >= 0) {
        await api.put(`/api/products/` + code, {
          name: data.name,
          value: data.value,
        });
      }
    }
    if(flag) navigate("/products/");
  };

  useEffect(() => { //Carregar os dados no forms para atualização
    if (!code) return;

    const fetchProd = async () => {
      try {
        console.log("Buscando produto com code:", code);
        const { data } = await api.get(`/api/products/${code}`); //Carrega os dados do produto 
        console.log("Produto encontrado:", data);

        reset({ //Armazena nos campos do forms
          name: data[0].Nome || "",
          value: data[0].Valor || 0,
          code: data[0].Codigo_de_Barras || "", 
        });
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProd();
  }, [code, reset]);

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
        {/* Campo Nome */}
        <TextField
          label="Nome"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ marginBottom: 2 }}
          {...register("name")}
          InputLabelProps={{
            shrink: !!errors.name || !!watch("name"),
          }}
        />

        {/* Campo Código de Barras */}
        <TextField
          label="Código de Barras"
          fullWidth
          error={!!errors.code}
          helperText={errors.code?.message}
          sx={{ marginBottom: 2 }}
          {...register("code")}
          InputProps={{
            readOnly: !!code, // Campo fixo no modo update
          }}
          InputLabelProps={{
            shrink: !!watch("code"), // Mantém label no topo se houver valor
          }}
        />

        {/* Campo Valor */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <Controller
            control={control}
            name="value"
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  label="Valor"
                  fullWidth
                  type="number"
                  error={!!errors.value}
                  helperText={errors.value?.message}
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : ""
                    )
                  }
                />
              </FormControl>
            )}
          />
        </Stack>

        {/* Botões */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button type="submit" variant="contained" size="large">
            {code ? "Atualizar Produto PET" : "Criar Produto PET"}
          </Button>
          <Button component={RouterLink} to="/products">
            Cancelar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default FormProd; //Retorna formulário de Produto
