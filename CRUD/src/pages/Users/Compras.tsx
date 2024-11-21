import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormCompras from "../../components/FormCompras";
import BasePageCompras from "../../components/BasePageCompras";
import UserInfo from "../../components/UserInfo";
import ComprasList from "../../components/ComprasList";
import { api } from "../../libs/axios";
import { CircularProgress, Box, Typography } from "@mui/material";
import { User } from "./types/User";

interface Purchase {
  id: number;
  name: string;
  code_product: string;
  user_id: number;
  quantity: number;
  value: number;
  data: string;
}

const Compras = () => {
  const { id } = useParams(); // Obtém o ID da URL
  const [user, setUser] = useState<User | null>(null); // Estado para armazenar os dados do usuário
  const [purchases, setPurchases] = useState<Purchase[]>([]); // Estado para armazenar as compras do usuário
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  const navigate = useNavigate();

  // Busca informações do usuário
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/users/${id}`);
        setUser(response.data);
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
      setPurchases(response.data);
    } catch (error) {
      console.error("Erro ao buscar compras:", error);
    }
  };

  const handleAddPurchase = async (newPurchase: { code_product: string; quantidade: number }) => {
    try {
      await api.post("/api/compras", {
        ...newPurchase,
        user_id: parseInt(id || "0"),
      });
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
      setPurchases((prev) => prev.filter((purchase) => (purchase.id !== user_Id) && (purchase.code_product !== code_product)));
    } catch (error) {
      console.error("Erro ao remover compra:", error);
      alert("Erro ao remover compra.");
    }
  };

  // Busca compras ao carregar a página
  useEffect(() => {
    fetchPurchases();
  }, [id]);

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
