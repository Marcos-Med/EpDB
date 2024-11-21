import React from "react";
import { Stack, IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import DataGridCompras from "./DataGridCompras";
import { useParams } from "react-router-dom";

interface Purchase {
  id: number;
  name: string;
  code_product: string;
  quantity: number;
  value: number;
  data: string;
}

interface ComprasListProps {
  purchases: Purchase[];
  onEditPurchase: (user_Id: number, code_product: string, updatedPurchase: Partial<Purchase>) => void;
  onDeletePurchase: (user_Id: number, code_product: string) => void;
}

const ComprasList: React.FC<ComprasListProps> = ({
  purchases,
  onEditPurchase,
  onDeletePurchase,
}) => {

  const { id } = useParams();
  let user_id: any;
  if(id){
    user_id = parseInt(id);
  }

  const columns: GridColDef<Purchase>[] = [
    { field: "code_product", headerName: "Código", flex: 1 },
    { field: "name", headerName: "Produto", flex: 1},
    { field: "quantity", headerName: "Quantidade", flex: 1 },
    { field: "value", headerName: "Valor (R$)", flex: 1 },
    { field: "data", headerName: "Data", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="info"
            size="small"
            onClick={() => onEditPurchase(user_id, params.row.code_product, params.row)}
          >
            <Edit fontSize="inherit" />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => onDeletePurchase(user_id, params.row.code_product)}
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return <DataGridCompras rows={purchases} columns={columns} />;
};

export default ComprasList;
