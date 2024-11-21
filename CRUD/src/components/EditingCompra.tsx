import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { api } from '../libs/axios';
import { useNavigate } from 'react-router-dom';

interface EditablePurchaseFormProps {
  code_product: string;
  user_Id: number;
}

const EditablePurchaseForm: React.FC<EditablePurchaseFormProps> = ({
  code_product,
  user_Id,
}) => {
  // Estados para armazenar as informações do produto e a quantidade
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [saving, setSaving] = useState(false); // Estado para controlar o botão de salvar
  const navigate = useNavigate();

  // Efetua a requisição ao servidor quando o componente é montado
  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      try {
        const response = await api.get(`/api/compras/${user_Id}/${code_product}`);
        setProductName(response.data.name);
        setQuantity(response.data.quantity);
      } catch (error) {
        console.error('Erro ao carregar os detalhes da compra:', error);
      } 
    };

    fetchPurchaseDetails();
  }, [user_Id, code_product]); // Recarrega os dados quando `user_Id` ou `code_product` mudarem

  const handleSave = async () => {
    if (quantity <= 0) {
      alert('Quantidade deve ser maior que zero!');
      return;
    }

    try {
      setSaving(true);
      await api.put(`/api/compras/${user_Id}/${code_product}`, { quantity });
    } catch (error) {
      console.error('Erro ao salvar a quantidade:', error);
      alert('Erro ao salvar as alterações.');
    } finally {
      setSaving(false);
      navigate(`/compras/${user_Id}`); // Navega de volta para a página de compras após salvar
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      {/* Nome do produto */}
      <Typography variant="h6" style={{ minWidth: '200px' }}>
        {productName}
      </Typography>

      {/* Caixa para editar quantidade */}
      <TextField
        type="number"
        label="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        InputProps={{ inputProps: { min: 1 } }}
        disabled={saving} // Desabilita a caixa enquanto está salvando
      />

      {/* Botão de salvar */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={saving} // Desabilita o botão enquanto está salvando
      >
        Salvar
      </Button>
    </Box>
  );
};

export default EditablePurchaseForm;
