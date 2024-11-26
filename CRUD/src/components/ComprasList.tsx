import React from "react";
import { Stack, IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import DataGridCompras from "./DataGridCompras";
import { useParams } from "react-router-dom";

interface Purchase { //Define uma compra
  id: number;
  name: string;
  code_product: string;
  quantity: number;
  value: number;
  data: string;
}

interface ComprasListProps { //Parâmetros da página
  purchases: Purchase[]; //Array de compras
  onEditPurchase: (user_Id: number, code_product: string, updatedPurchase: Partial<Purchase>) => void; //Função de Editar compra
  onDeletePurchase: (user_Id: number, code_product: string) => void; //Função de Deletar compra
}

const ComprasList: React.FC<ComprasListProps> = ({
  purchases,
  onEditPurchase,
  onDeletePurchase,
}) => {

  const { id } = useParams(); //id User
  let user_id: any;
  if(id){
    user_id = parseInt(id);
  }

  const columns: GridColDef<Purchase>[] = [ //Define a lista de compra
    { field: "code_product", headerName: "Código", flex: 1 }, //Código do produto
    { field: "name", headerName: "Produto", flex: 1}, //Nome do produto
    { field: "quantity", headerName: "Quantidade", flex: 1 }, //Quantidade
    { field: "value", headerName: "Valor (R$)", flex: 1 }, //Valor total
    { field: "data", headerName: "Data", flex: 1 }, //Data da compra
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
            <Edit fontSize="inherit" /> {/* Botão de Editar Compra */}
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => onDeletePurchase(user_id, params.row.code_product)}
          >
            <Delete fontSize="inherit" /> {/* Botão de Deletar Compra */}
          </IconButton>
        </Stack>
      ),
    },
  ];

  return <DataGridCompras rows={purchases} columns={columns} />;
};

export default ComprasList; //Retorna lista de Compras
