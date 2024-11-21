import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Página Principal

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Sistema de Hotelaria!
      </Typography>

      <Typography variant="subtitle1" sx={{ marginBottom: 4 }}>
        Escolha uma das opções abaixo:
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/users"
        >
          Usuários
        </Button>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/products"
        >
          Produtos de Pets
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
