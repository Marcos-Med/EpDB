import { useState, useEffect } from "react";
import { Box, Button, CircularProgress, MenuItem, Select, TextField } from "@mui/material";
import { api } from "../libs/axios";

interface Prod { //Parâmetros do produto
  code: string;
  name: string;
}

interface FormComprasProps {
  onAddPurchase: (newPurchase: { code_product: string; quantidade: number }) => void; //Função de adicionar compras
}

function FormCompras({ onAddPurchase }: FormComprasProps) { //Componente de Compras
  const [items, setItems] = useState<Prod[]>([]);
  const [item, setItem] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get(`/api/products`); //Carrega os produtos
        setItems(response.data.map((value: any) => ({ 
          id: String(value.Codigo_de_Barras),
          code: value.Codigo_de_Barras,
          name: value.Nome,
          value: value.Valor})));
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar os itens:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSubmit = () => {
    if (!item) return alert("Selecione um item!");
    if (quantity <= 0) return alert("Quantidade deve ser maior que zero!");

    const selectedProduct = items.find((prod) => prod.name === item);
    if (!selectedProduct) return alert("Produto não encontrado!");

    const { code } = selectedProduct; // Produto Selecionado

    onAddPurchase({ code_product: code, quantidade: quantity }); //Realiza compra

    setItem("");
    setQuantity(1);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" gap={2} mb={2}>
      <Select //Campo para selecionar produto
        value={item}
        onChange={(e) => setItem(e.target.value)}
        displayEmpty
        fullWidth
        variant="outlined"
      >
        <MenuItem value="" disabled>
          Selecione um produto
        </MenuItem>
        {items.map((product) => (
          <MenuItem key={product.code} value={product.name}>
            {product.name}
          </MenuItem>
        ))}
      </Select>

      <TextField //Campo para quantidade
        type="number"
        label="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        InputProps={{ inputProps: { min: 1 } }}
        variant="outlined"
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Comprar {/* Botão para realizar a compra */}
      </Button>
    </Box>
  );
}

export default FormCompras; //Retorna o formulário de compras
