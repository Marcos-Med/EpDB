import { Stack, IconButton } from '@mui/material';
import { GridRenderCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import MyDataGrid from '../../components/MyDataGrid';
import { User } from './types/User';
import { Delete, Edit} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import BasePageLayout from '../../components/BasePageLayout';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useLocalStorage<User[]>('users', []);

  function onEdit(params: GridRenderCellParams): void {
    // se existe o id, navega para a página de edição
    if (!params.row.id) return;
    navigate(`/users/${params.row.id}`);
  }

  function onDelete(params: GridRenderCellParams): void {
    // se existe o id, remove o usuário
    if (!params.row.id) return;
    setUsers(users.filter((user) => user.id !== params.row.id));
  }

  const columns: GridColDef<User>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'firstName',
      headerName: 'Nome',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName.split(' ')?.shift() || ''}`
    },
    { field: 'document', headerName: 'CPF', width: 150 },
    { field: 'mobile', headerName: 'Telefone', width: 180 },
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
    <BasePageLayout pageTitle='Listar' labelTitle='Listar'>
      <MyDataGrid columns={columns} rows={users} />
    </BasePageLayout>

  );
};
export default UserList;