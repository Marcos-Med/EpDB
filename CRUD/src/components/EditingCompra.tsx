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
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState<number | null>(null); // Usar null para indicar valor inicial indefinido
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      try {
        const response = await api.get(`/api/compras/${user_Id}/${code_product}`);
        setProductName(response.data[0].name);
        setQuantity(response.data[0].quantity ?? 0); // Garante que quantity não seja undefined
      } catch (error) {
        console.error('Erro ao carregar os detalhes da compra:', error);
      }
    };

    fetchPurchaseDetails();
  }, [user_Id, code_product]);

  const handleSave = async () => {
    if (quantity === null || quantity <= 0) {
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
      navigate(`/compras/${user_Id}`);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <Typography variant="h6" style={{ minWidth: '200px' }}>
        {productName}
      </Typography>

      <TextField
        type="number"
        label="Quantidade"
        value={quantity !== null ? quantity : ''} // Certifica-se de passar uma string quando quantity for null
        onChange={(e) => setQuantity(Number(e.target.value))}
        InputProps={{ inputProps: { min: 1 } }}
        disabled={saving}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={saving}
      >
        Salvar
      </Button>
    </Box>
  );
};

export default EditablePurchaseForm;
