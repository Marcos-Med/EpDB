import { AddShoppingCart } from '@mui/icons-material';  // Ícone de novo produto (substituindo o PersonAddAlt)
import { Stack, Box, Button, Paper } from '@mui/material';
import MyBreadcrumbs from './MyBreadcrumbs';
import PageTitle from './PageTitle';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

interface IBasePageLayoutProps {
  children: React.ReactNode
  pageTitle: string
  labelTitle: string
}

const BasePageProd = ({ children, pageTitle, labelTitle }: IBasePageLayoutProps) => {
  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle title={pageTitle} />
          <MyBreadcrumbs
            path={[{ label: 'Produtos', to: '/products' }, { label: labelTitle }]}
          />
        </Box>
        <Box>
          <Button
            component={RouterLink}
            to='/products/new'  // URL para novo produto
            variant='contained'
            startIcon={<AddShoppingCart />}  // Novo ícone específico para produto
          >
            Novo Produto  {/* Texto ajustado para novo produto */}
          </Button>
        </Box>
      </Stack>
      <Paper>
        {children}
      </Paper>
    </>
  );
};

export default BasePageProd;
