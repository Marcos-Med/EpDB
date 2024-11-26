import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

interface IMyDataGridProps { //Colunas e Linhas
  columns: GridColDef[]
  rows: GridValidRowModel[]
}

const MyDataGrid = ({ columns, rows }: IMyDataGridProps) => { //Define a estrutura de dados da lista de Usuários

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
export default MyDataGrid;
