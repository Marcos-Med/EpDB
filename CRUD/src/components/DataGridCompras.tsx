import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

interface IMyDataGridProps { //Recebe as linhas e colunas da tabela
  columns: GridColDef[]
  rows: GridValidRowModel[]
}

const DataGridCompras = ({ columns, rows }: IMyDataGridProps) => {

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.code_product} //Define Código de Barras como ID da Tabela
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
export default DataGridCompras; //Retorna a estrutura de dados da Tabela Compras
