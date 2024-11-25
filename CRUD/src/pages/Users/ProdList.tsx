import { Stack, IconButton } from '@mui/material';
import { GridRenderCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import MyDataGrid from '../../components/MyDataGrid';
import { User } from './types/User';
import { Delete, Edit} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BasePageProd from '../../components/BasePageProd';
import { useProdsList } from '../../hooks/useProdsList';
import { api } from '../../libs/axios';
import { API_BASE_URL } from '../../config/apiConfig';

const ProdList = () => {
  const navigate = useNavigate();
 
  const {prod, fetchProds} = useProdsList();

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id && params.row.id !== 0) return;
    navigate(`/products/${params.row.id}`);
  }

  async function onDelete(params: GridRenderCellParams): Promise<void> {
    try {
      // Verifica se o ID existe antes de prosseguir
      if (!params.row.id && params.row.id !== 0) {
        console.error("ID não encontrado para exclusão.");
        return;
      }
  
      // Remove o usuário
      await api.delete(`${API_BASE_URL}/api/products/` + params.row.id);
      console.log(`Usuário com ID ${params.row.id} removido com sucesso.`);
      fetchProds();

    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  const columns: GridColDef<User>[] = [
    { field: 'id', headerName: 'Código', width: 70 },
    {
      field: 'name',
      headerName: 'Nome',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.name.split(' ')?.shift() || ''}`
    },
    { field: 'value', headerName: 'Valor', width: 150 },
    {
      field: 'actions',
      headerName: 'Ações',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <IconButton color="info" size="small" onClick={() => onEdit(params)}>
            <Edit fontSize="inherit" />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={() => onDelete(params)}
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </Stack>
      )
    }
  ];

  return (
    <BasePageProd pageTitle='Listar' labelTitle='Listar'>
      <MyDataGrid columns={columns} rows={prod} />
    </BasePageProd>

  );
};
export default ProdList;