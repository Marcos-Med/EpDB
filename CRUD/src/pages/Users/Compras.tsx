import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormCompras from "../../components/FormCompras";
import BasePageCompras from "../../components/BasePageCompras";
import UserInfo from "../../components/UserInfo";
import ComprasList from "../../components/ComprasList";
import { api } from "../../libs/axios";
import { CircularProgress, Box, Typography } from "@mui/material";
import { User } from "./types/User";
import { Prod } from "./types/Prod";

interface Purchase {
  id: number;
  name: string;
  code_product: string;
  user_id: number;
  quantity: number;
  value: number;
  data: string;
}

function getName(id: any, products: any): any {
  return products.filter((v: any) => v.id == id); //Gera o nome do produto
}

const Compras = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [user, setUser] = useState<User | null>(null); // Estado para armazenar os dados do usuário
  const [purchases, setPurchases] = useState<Purchase[]>([]); // Estado para armazenar as compras do usuário
  const [products, setProd] = useState<Prod[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  const navigate = useNavigate();

  // Busca informações do usuário
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/users/${id}`);
        setUser({id: response.data[0].ID,
          name: response.data[0].Nome,
          cpf: response.data[0].CPF,
          phone: response.data[0].Telefone
        });
        const req = await api.get(`/api/products`);
        setProd(req.data.map((value: any) => ({
          id: value.Codigo_de_Barras,
          code: value.Codigo_de_Barras,
          name: value.Nome,
          value: value.Valor
        })));
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Busca lista de compras do usuário
  const fetchPurchases = async () => {
    try {
      const response = await api.get(`/api/compras/${id}`);
      setPurchases(response.data.map((value: any) => (
       {user_id: value.fk_Cliente_ID,
        name: getName(value.fk_Produto_PET_Codigo_de_Barras, products)[0].name,
        code_product: value.fk_Produto_PET_Codigo_de_Barras,
        id: value.fk_Produto_PET_Codigo_de_Barras,
        quantity: value.Quantidade,
        value: value.Valor,
        data: value.Data }
      )));
    } catch (error) {
      console.error("Erro ao buscar compras:", error);
    }
  };



  const handleAddPurchase = async (newPurchase: { code_product: string; quantidade: number }) => {
    try {
      await api.post(`/api/compras`, {
        ...newPurchase,
        user_id: parseInt(id || "0"),
      })
      await fetchPurchases(); // Atualiza a lista de compras
    } catch (error) {
      console.error("Erro ao adicionar compra:", error);
      alert("Erro ao adicionar compra.");
    }
  };

  // Edita uma compra existente
  const handleEditPurchase = (userId: number, codeProduct: string) => {
    navigate(`/compras/${userId}/${codeProduct}`); // Redireciona para a página de edição
  };

  // Remove uma compra
  const handleDeletePurchase = async (user_Id: number, code_product: string ) => {
    try {
      await api.delete(`/api/compras/${user_Id}/${code_product}`);
      setPurchases(purchases.filter((purchase) => purchase.code_product !== code_product));
    } catch (error) {
      console.error("Erro ao remover compra:", error);
      alert("Erro ao remover compra.");
    }
  };

  // Busca compras ao carregar a página
  useEffect(() => {
    if(!loading && products.length > 0){
      fetchPurchases();
    }
  }, [loading, id]);

  // Exibição de carregamento
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Exibição de erro caso o usuário não seja encontrado
  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6">Usuário não encontrado.</Typography>
      </Box>
    );
  }

  return (
    <BasePageCompras pageTitle="Comprar produto">
      <UserInfo name={user.name} cpf={user.cpf} phone={user.phone} />
      <FormCompras onAddPurchase={handleAddPurchase} />
      <ComprasList
        purchases={purchases}
        onEditPurchase={handleEditPurchase}
        onDeletePurchase={handleDeletePurchase}
      />
    </BasePageCompras>
  );
};

export default Compras;
