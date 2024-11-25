import { Stack, IconButton } from '@mui/material';
import { GridRenderCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import MyDataGrid from '../../components/MyDataGrid';
import { User } from './types/User';
import { Delete, Edit, ShoppingCart} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BasePageLayout from '../../components/BasePageLayout';
import { useUsersList } from '../../hooks/useUsersList';
import { api } from '../../libs/axios';

const UserList = () => {
  const navigate = useNavigate();
 
  const {users, fetchUsers} = useUsersList();

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id && params.row.id !== 0) return;
    navigate(`/users/${params.row.id}`);
  }

  // Função para o botão de Comprar
  const onBuy = (params: GridRenderCellParams): void => {
    // Adicione a lógica que você deseja ao clicar no botão "Comprar"
    navigate("/compras/" + params.row.id);
  };

  async function onDelete(params: GridRenderCellParams): Promise<void> {
    try {
      // Verifica se o ID existe antes de prosseguir
      if (!params.row.id && params.row.id !== 0) {
        console.error("ID não encontrado para exclusão.");
        return;
      }
  
      // Remove o usuário
      await api.delete("/api/users/" + params.row.id);
      console.log(`Usuário com ID ${params.row.id} removido com sucesso.`);
      fetchUsers();

    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  const columns: GridColDef<User>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name',
      headerName: 'Nome',
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.name
    },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    { field: 'phone', headerName: 'Telefone', width: 180 },
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
          <IconButton
            color="success"
            size="small"
            onClick={() => onBuy(params)} // Chama a função de compra
          >
            <ShoppingCart fontSize="inherit" />
          </IconButton>

        </Stack>
      )
    }
  ];

  return (
    <BasePageLayout pageTitle='Listar' labelTitle='Listar'>
      <MyDataGrid columns={columns} rows={users} />
    </BasePageLayout>

  );
};
export default UserList;